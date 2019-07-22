import { Component, Inject, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean = false;

  password() {
    this.show = !this.show;
  }

  constructor(private webService: WebService, private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }


  signIn(f) {
    // LOGIN AUTHONICATION
    // SAVE SESSION OR LOCAL KEY? MAYBE TOKEN
    // BELLOW IS TEMP ONLY!
    this.storage.set(STORAGE_KEY, 'userin');
    this.router.navigate(['articles']);
  }
}
