import { WebService } from '../services/web.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { Articles } from '../services/models/articles.model';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
	selector: 'app-add-article',
	templateUrl: './add-article.component.html',
	styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

	uploadProgress: any; // find way to implement upload progressing!!

	constructor(private router: Router,
		public webService: WebService,
		@Inject(SESSION_STORAGE) private mstorage: StorageService,
		private toastr: ToastrService,
		private article: Articles) { }


	ngOnInit() {
		if (this.mstorage.get(STORAGE_KEY) == null) {
			this.router.navigate(['login']);
		}
	}

	saveFormData() {
		// WIP SAVE DATA TO DATABASE
	}

	onSelectedFile(event) {
		// WIP UPLOAD IMAGE TO DATABASE??
	}
}
