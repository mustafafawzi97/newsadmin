import { WebService } from '../services/web.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Notify } from '../services/models/notify.model';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  constructor(private router: Router,
    public webService: WebService,
    @Inject(SESSION_STORAGE) private mstorage: StorageService,
    private notify: Notify,
    private toastr: ToastrService, ) { }

  ngOnInit() {
    if (this.mstorage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
  }

  async saveFormData(form: NgForm) {
    let today = new Date();
    this.notify.date = formatDate(today, 'medium', 'en-US');
    await this.webService.addNotify(this.notify).subscribe(data => {
      console.log(data['add']);
      if (data['add'] != undefined && data['add'] == true) {
        form.resetForm();
        this.toastr.show("تم اضافة الحدث بنجاح", "نجاح");
        this.router.navigate(['all-notify']);
      }
    }, error => {
      if (error.status == 422) {
        this.toastr.show("حدث خطا اثناء اضافة الحدث", "خطأ");
      }
    });
  }
}
