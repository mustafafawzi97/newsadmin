import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { NotifyComponent } from '../../notify/notify.component';
import { AllNotifyComponent } from '../../all-notify/all-notify.component';
import { ArticlesComponent } from '../../articles/articles.component';
import { AddArticleComponent } from '../../add-article/add-article.component';
import { EditArticleComponent } from '../../edit-article/edit-article.component';
import { ArticleViewComponent } from '../../article-view/article-view.component';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    NgxSpinnerModule,
    NgxTrumbowygModule.withConfig({
      lang: 'ar',
      svgPath: '/assets/icons.svg',
      removeformatPasted: true,
      autogrow: true,
      btns: [
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
        ['fullscreen'],
        ['insertImage']
      ],
      events: {}
    }),
  ],
  declarations: [
    ConfirmDeleteComponent,
    NotifyComponent,
    AllNotifyComponent,
    ArticleViewComponent,
    ArticlesComponent,
    AddArticleComponent,
    EditArticleComponent,
  ],
  entryComponents: [ConfirmDeleteComponent, ArticleViewComponent]
})

export class AdminLayoutModule { }
