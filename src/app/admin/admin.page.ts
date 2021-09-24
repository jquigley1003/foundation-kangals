import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Photo } from '../shared/models/photo.model';
import { User } from '../shared/models/user.model';
import { AlertService } from '../shared/notify/alert.service';
import { ToastService } from '../shared/notify/toast.service';
import { PhotoModalComponent } from '../shared/photo/photo-modal/photo-modal.component';
import { PhotoService } from '../shared/photo/photo.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject<void>();
  showSection = null;
  users: User[];
  loadedUsers: User[];
  photos: Photo[];
  loadedPhotos: Photo[];


  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private userService: UserService,
    private photoService: PhotoService,
    private alertService: AlertService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllPhotos();
  }

  showAdminMenu(section) {
    this.showSection = section;
  }

  async getAllUsers() {
    this.userService.allUsers$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async data => {
        this.users = data;
        this.loadedUsers = data;
      });
  }

  initializeList() {
    this.users = this.loadedUsers;
  }

  filterByName(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(person => {
      if((person.firstName + ' ' + person.lastName) && searchTerm) {
        if ((person.firstName+ ' ' + person.lastName).toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
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

  async getAllPhotos() {
    this.photoService.allPhotos$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async data => {
        this.photos = data;
        this.loadedPhotos = data;
        console.log('admin page users: ', this.users);
      });
  }

  deletePhoto(photo: Photo) {
    this.photoService.deletePhoto(photo);
  }

  editPhoto(photo: Photo) {
    this.modalCtrl.create({
      cssClass: 'fullscreen',
      swipeToClose: true,
      component: PhotoModalComponent,
      componentProps: {
        img: photo
      }
    }).then(modal => {
      modal.present();
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
