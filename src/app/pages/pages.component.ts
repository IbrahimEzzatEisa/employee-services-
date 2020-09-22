import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ChangeThemeService, SwalService } from '../shared/services';
import { NotificationService } from '../shared/services/api/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';
import { MainNavComponent } from '../shared/components';

let audio = new Audio('../../assets/audio/what-friends-are-for.mp3');
@Component({
  selector: 'app-pages',
  templateUrl: './o.html',
  styleUrls: ['./o.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('nav', { static: false }) navbar: MainNavComponent;

  

  notificationList: any[] = [];


  constructor(private changeThemeService: ChangeThemeService,
    private notificationService: NotificationService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.changeColor();
    this.getNotification();
  }
  getNotification(){
    this.notificationService.listen().subscribe(res => {
      let UserId = (JSON.parse(res.data)).UserId;
      if (UserId == JSON.parse(localStorage.getItem('User')).UserID) {
        audio.play().then(() => {
          this.swalService.NotifierEvent('اشعــــار جــديد', (JSON.parse(res.data)).Message)
        });
        this.navbar.Notifications();
      }
    })
    this.notificationService.listenEmp().subscribe(res => {
      let UserId = (JSON.parse(res.data)).UserId;
      if (UserId == JSON.parse(localStorage.getItem('User')).UserID) {
        audio.play().then(() => {
          this.swalService.NotifierEvent('اشعــــار جــديد', (JSON.parse(res.data)).Message);
          this.navbar.Notifications();
        });
      }
    })
  }
  changeColor() {
    this.changeThemeService.changeColor();
  }
}
