import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AnimationController, Animation, ModalController, IonSlides } from '@ionic/angular';

import { PhotoModalComponent } from 'src/app/shared/modals/photo-modal/photo-modal.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit, AfterViewInit {
  @ViewChild('photosTitle') photosTitle: ElementRef;
  @ViewChild('cujoPics') cujoSlider: IonSlides;
  @ViewChild('keviPics') keviSlider: IonSlides;
  @ViewChild('litterAPics') litterASlider: IonSlides;

  showCujoNav = false;
  showKeviNav = false;
  showLitterANav = false;
  photosTitleAnim: Animation;

  sliderOpts = {
    zoom: false,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20
  };

  cujoImgs = [
    {
      id: 1,
      url: '../../../assets/cujo/cujo-child.jpg',
      title: 'Cujo with Child'
    },
    {
      id: 2,
      url: '../../../assets/cujo/cujo-marisa.jpg',
      title: 'Cujo jumping on Marisa'
    },
    {
      id: 3,
      url: '../../../assets/cujo/cujo-sunset.jpg',
      title: 'Cujo enjoying sunset with Marisa'
    }
  ];

  keviImgs = [
    {
      id: 1,
      url: '../../../assets/kevi/Kevi-1.jpg',
      title: 'Kevi relaxing'
    },
    {
      id: 2,
      url: '../../../assets/kevi/Kevi-2.jpg',
      title: 'Kevi enjoying some love'
    },
    {
      id: 3,
      url: '../../../assets/kevi/Kevi-3.jpg',
      title: 'Kevi and her friend'
    },
    {
      id: 4,
      url: '../../../assets/kevi/Kevi-4.jpg',
      title: 'Kevi walking with Marisa'
    }
  ];

  litterAImgs = [
    {
      id: 1,
      url: '../../../assets/litterA/litterA-01-nursing.jpg',
      title: 'Puppies nursing'
    },
    {
      id: 2,
      url: '../../../assets/litterA/litterA-02-nursing.jpg',
      title: 'Puppies nursing'
    },
    {
      id: 3,
      url: '../../../assets/litterA/litterA-03-nursing.jpg',
      title: 'Puppies nursing'
    },
    {
      id: 4,
      url: '../../../assets/litterA/litterA-04-whelping.jpg',
      title: 'Whelping details'
    },
    {
      id: 5,
      url: '../../../assets/litterA/litterA-05-athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 6,
      url: '../../../assets/litterA/litterA-06-athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 7,
      url: '../../../assets/litterA/litterA-07-aries-f.jpg',
      title: 'Aries - Female with brown collar'
    },
    {
      id: 8,
      url: '../../../assets/litterA/litterA-08-aries-f.jpg',
      title: 'Aries - Female with brown collar'
    },
    {
      id: 9,
      url: '../../../assets/litterA/litterA-09-aries-f.jpg',
      title: 'Aries - Female with brown collar'
    },
    {
      id: 10,
      url: '../../../assets/litterA/litterA-10-america-f.jpg',
      title: 'America - Female with aqua collar'
    },
    {
      id: 11,
      url: '../../../assets/litterA/litterA-11-america-f.jpg',
      title: 'America - Female with aqua collar'
    },
    {
      id: 12,
      url: '../../../assets/litterA/litterA-12-alexis-f.jpg',
      title: 'Alexis - Female with dark blue collar'
    },
    {
      id: 13,
      url: '../../../assets/litterA/litterA-13-alexis-f.jpg',
      title: 'Alexis - Female with dark blue collar'
    },
    {
      id: 14,
      url: '../../../assets/litterA/litterA-14-alexis-f.jpg',
      title: 'Alexis - Female with dark blue collar'
    },
    {
      id: 15,
      url: '../../../assets/litterA/litterA-15-almondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 16,
      url: '../../../assets/litterA/litterA-16-almondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 17,
      url: '../../../assets/litterA/litterA-17-almondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 18,
      url: '../../../assets/litterA/litterA-18-almondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 19,
      url: '../../../assets/litterA/litterA-19-axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 20,
      url: '../../../assets/litterA/litterA-20-axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 21,
      url: '../../../assets/litterA/litterA-21-axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 22,
      url: '../../../assets/litterA/litterA-22-axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 23,
      url: '../../../assets/litterA/litterA-23-atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 24,
      url: '../../../assets/litterA/litterA-24-atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 25,
      url: '../../../assets/litterA/litterA-25-atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 26,
      url: '../../../assets/litterA/litterA-26-africaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 27,
      url: '../../../assets/litterA/litterA-27-africaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 28,
      url: '../../../assets/litterA/litterA-28-ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 29,
      url: '../../../assets/litterA/litterA-29-ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 30,
      url: '../../../assets/litterA/litterA-30-ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 31,
      url: '../../../assets/litterA/litterA-31-ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
  ];

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.photosTitleAnim = this.animationCtrl.create('myPhotosTitleAnim');
    this.photosTitleAnim
      .addElement(this.photosTitle.nativeElement)
      .duration(2000)
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    this.photosTitleAnim.play();
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
}
