import { Observable } from 'rxjs';
import { WebService } from '../services/web.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Articles } from 'app/services/models/articles.model';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  uploadProgress: Observable<number>;

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
        this.article.description = data.description;
        this.article.imgname = data.imgname;
        this.article.image = data.image;
      });
    }
  }

  saveFormData() {
    // SENT UPDATE REQUEST TO DATABASE
  }

  onSelectedFile(event) {
    // UPLOAD NEW IMAGE DATABASE?
  }
}
