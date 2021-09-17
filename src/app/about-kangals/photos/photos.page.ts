import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AnimationController, Animation, ModalController, IonSlides, NavController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PhotoModalComponent } from 'src/app/shared/photo/photo-modal/photo-modal.component';
import { AlbumModalComponent } from 'src/app/shared/photo/album-modal/album-modal.component';
import { UploadPhotoModalComponent } from 'src/app/shared/photo/upload-photo-modal/upload-photo-modal.component';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { AlertService } from 'src/app/shared/notify/alert.service';
import { PhotoService } from 'src/app/shared/photo/photo.service';
import { Photo } from 'src/app/shared/models/photo.model';
import { Album } from 'src/app/shared/models/album.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('photosTitle') photosTitle: ElementRef;
  @ViewChild('cujoPics') cujoSlider: IonSlides;
  @ViewChild('keviPics') keviSlider: IonSlides;
  @ViewChild('astraPics') astraSlider: IonSlides;
  @ViewChild('fkPics') picSlider: IonSlides;

  currentAlbum = 'All Photos';

  showPicNav = false;
  photosTitleAnim: Animation;
  currentUser = null;

  sliderOpts = {
    zoom: false,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 10
  };

  albums$: Observable<any>;
  albums: Array<Album> = [];
  photos$: Observable<any>;
  allPhotos: Array<Photo> = [];
  photos: Array<Photo> = [];
  ngUnsubscribe = new Subject<void>();

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    private authService: AuthService,
    private photoService: PhotoService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getAlbums();
    this.getPhotos();
  }

  ngAfterViewInit() {
    this.photosTitleAnim = this.animationCtrl.create('myPhotosTitleAnim');
    this.photosTitleAnim
      .addElement(this.photosTitle.nativeElement)
      .duration(2000)
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    this.photosTitleAnim.play();
    // console.log('photo page currentUser: ', this.currentUser);
  }

  getCurrentUser() {
    this.authService.currentUser$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.currentUser = data;
      });
  }

  getAlbums() {
    this.albums$ = this.photoService.albums$;
    this.albums$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.albums = data;
      });
  }

  getPhotos() {
    this.photos$ = this.photoService.photos$;
    this.photos$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.allPhotos = data;
        this.photos = data;
      });
  }

  resetPhotos() {
    this.photos = this.allPhotos;
  }

  async chooseAlbum(album) {
    this.currentAlbum = album.title;
    this.resetPhotos();
    if(this.photos.some(obj => obj.albumId === album.id)) {
      this.photos = this.photos.filter(pics => {
        if(pics.albumId) {
          if (pics.albumId.toLowerCase()
            .indexOf(album.id.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
    } else {
      this.showAllPhotos();
      this.alertService.presentAlert(
        'Sorry!',
        'No pictures in this album',
        'please try another album',
        ['OK']
      );
    }
  }

  showAllPhotos() {
    this.currentAlbum = 'All Photos';
    this.resetPhotos();
  }

  openPreview(image) {
    this.modalController.create({
      cssClass: 'fullscreen',
      swipeToClose: true,
      component: PhotoModalComponent,
      componentProps: {
        img: image
      }
    }).then(modal => {
      modal.present();
    });
  }

  toPrevSlide(slider) {
    slider.slidePrev();
  }

  toNextSlide(slider) {
    slider.slideNext();
  }

  showSlideButtons(nav) {
    nav = true;
  }

  hideSlideButtons(nav) {
    nav = false;
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToAboutKangals() {
    // this.router.navigate(['about-kangals']);
    this.navCtrl.navigateBack('about-kangals');
  }

  // Admin Only - Create new album or add more pictures
  openAlbumModal() {
    this.modalController.create({
      swipeToClose: true,
      component: AlbumModalComponent,
      componentProps: {}
    }).then(modal => {
      modal.present();
    });
  }

  openUploadPhotoModal() {
    this.modalController.create({
      cssClass: 'fullscreen',
      swipeToClose: true,
      component: UploadPhotoModalComponent,
      componentProps: {
        // creatorId: this.currentUser.uid,
        creatorId: 123245,
        albums: this.albums
      }
    }).then(modal => {
      modal.present();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
