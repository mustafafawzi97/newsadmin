import { WebService } from '../services/web.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { Articles } from '../services/models/articles.model';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
const STORAGE_KEY = 'local_user';

@Component({
	selector: 'app-add-article',
	templateUrl: './add-article.component.html',
	styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

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

	async saveFormData(form: NgForm) {
		let today = new Date();
		this.article.date = formatDate(today, 'medium', 'en-US');
		await this.webService.addArticle(this.article).subscribe(data => {
			console.log(data['add']);
			if (data['add'] != undefined && data['add'] == true) {
				form.resetForm();
				this.toastr.show("تم اضافة الخبر بنجاح", "نجاح");
				this.router.navigate(['articles']);
			}
		}, error => {
			if (error.status == 422) {
				this.toastr.show("حدث خطا اثناء اضافة الخبر", "خطأ");
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
