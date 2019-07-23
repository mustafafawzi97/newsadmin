import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { Notify } from '../services/models/notify.model';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-all-notify',
  templateUrl: './all-notify.component.html',
  styleUrls: ['./all-notify.component.scss']
})
export class AllNotifyComponent implements OnInit, AfterViewInit {

  notifyData: Notify[];

  constructor(private webService: WebService,
    private router: Router, private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  openDialog(item): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true')
        this.deleteEvent(item);
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
    this.webService.getNotify().subscribe((notify: Notify[]) => {
      this.notifyData = notify;
    });
  }

  deleteEvent(item) {
    this.webService.deleteNotify(item).subscribe(data => {
      console.log(data['delete']);
      if (data['delete'] != undefined && data['delete'] == true) {
        this.toastr.show("تم حذف الحدث بنجاح", "نجاح");
      }
    }, error => {
      if (error.status == 422) {
        this.toastr.show("حدث خطا اثناء حذف الحدث", "خطأ");
      }
    });
  }
}

