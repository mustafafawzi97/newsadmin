import { Routes } from '@angular/router';
import { NotifyComponent } from '../../notify/notify.component';
import { AllNotifyComponent } from '../../all-notify/all-notify.component';
import { ArticlesComponent } from '../../articles/articles.component';
import { AddArticleComponent } from '../../add-article/add-article.component';
import { EditArticleComponent } from '../../edit-article/edit-article.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'articles', component: ArticlesComponent },
    { path: 'add-article', component: AddArticleComponent },
	{ path: 'edit-article/:id', component: EditArticleComponent },
    { path: 'notify', component: NotifyComponent },
    { path: 'all-notify', component: AllNotifyComponent },
    { path: '**', redirectTo: '/articles' }
];
