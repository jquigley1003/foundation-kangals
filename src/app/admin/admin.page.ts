import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { AlertService } from '../shared/notify/alert.service';
import { ToastService } from '../shared/notify/toast.service';

import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject<void>();
  users: User[];
  loadedUsers: User[];

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  async getAllUsers() {
    this.userService.allUsers$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async data => {
        this.users = data;
        this.loadedUsers = this.users;
        console.log('admin page users: ', this.users);
      });
  }

  makeAdmin(user) {
    this.userService.makeUserAdmin(user);
  }

  removeAdmin(user) {
    this.userService.removeAdminRole(user);
  }

  async deleteUser(user: User) {
    this.alertService.presentAlert(
      'Are You Sure?',
      'You will permanently delete ' + user.firstName + ' ' + user.lastName,
      'Choosing "Yes, Delete" will permanently remove this user from the database',
      [
        {
          text: 'Cancel',
          cssClass: 'alertCancel',
          role: 'cancel',
          handler: () => {
            console.log('You did not delete '+user.firstName);
            this.toastService.presentToast(
              `Deletion of ${user.firstName} canceled.`,
              'middle',
              [{
                text: 'OK',
                role: 'cancel',
              }], 5000);
          }
        },
        {
          text: 'Yes, Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.deleteUserConfirmed(user.uid);
          }
        }
      ]
    );
  }

  deleteUserConfirmed(userId) {
    this.userService.deleteUser(userId);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
