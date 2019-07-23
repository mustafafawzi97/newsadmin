import { WebService } from '../services/web.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Articles } from 'app/services/models/articles.model';
import { formatDate } from '@angular/common';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  constructor(private router: ActivatedRoute,
    private route: Router,
    public webService: WebService,
    @Inject(SESSION_STORAGE) private mstorage: StorageService,
    private toastr: ToastrService,
    private article: Articles) { }

  ngOnInit() {
    if (this.mstorage
      .get(STORAGE_KEY) == null) {
      this.route.navigate(['login']);
    }
    else {
      this.router.params.subscribe(data => {
        this.article.id = data.id;
        this.article.title = data.title;
        this.article.content = data.content;
        //this.article.image = data.image;
      });
    }
  }

  async saveFormData() {
    let today = new Date();
    this.article.date = formatDate(today, 'medium', 'en-US');
    await this.webService.addArticle(this.article).subscribe(data => {
      console.log(data['update']);
      if (data['update'] != undefined && data['update'] == true) {
        this.toastr.show("تم تحديث الخبر بنجاح", "نجاح");
        this.route.navigate(['articles']);
      }
    }, error => {
      if (error.status == 422) {
        this.toastr.show("حدث خطا اثناء تحديث الخبر", "خطأ");
      }
    });
  }

  onSelectedFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.article.image = 'data:image/png;base64,' + btoa(e.target.result);
    console.log(this.article.image);
  }
}
