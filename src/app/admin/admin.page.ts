import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.users = data;
        this.loadedUsers = this.users;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
