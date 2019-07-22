import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { ArticleViewComponent } from '../article-view/article-view.component'
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit {

  constructor(private firestoreService: WebService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  viewDialog(items) {
    this.dialog.open(ArticleViewComponent, {
      data: { article: items }
    });
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true')
        this.deleteArticle(item);
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
    // GET NEWS FROM DATABASE
  }

  substringText(text): any {
    return new DOMParser().parseFromString(text, "text/html").documentElement.textContent.substring(0, 300) + '...';
  }

  deleteArticle(item) {
    // SENT DELETE REQUEST 
  }

  updateArticle(item) {
    this.router.navigate(['edit-article', item]);
  }
}
