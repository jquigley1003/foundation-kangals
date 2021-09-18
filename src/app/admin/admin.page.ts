import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

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
    private userService: UserService
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

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
