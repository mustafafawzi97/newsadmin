import { Component, Inject, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../services/models/login.model';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean = false;

  getPassword() {
    this.show = !this.show;
  }

  constructor(private webService: WebService, private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private login: Login) { }

  ngOnInit() {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }

  signIn() {
    this.webService.checkLogin(this.login).subscribe(data => {
      console.log(data['exist'])
      if (data['exist'] != undefined && data['exist'] == true) {
        this.storage.set(STORAGE_KEY, data['exist']);
        this.router.navigate(['articles']);
      }
    }, error => {
      if (error.status == 422) {
        this.toastr.show("البريد الالكتروني او كلمة المرور غير صحيحة", "خطأ");
      }
    });
  }
}
