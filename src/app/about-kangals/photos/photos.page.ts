import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AnimationController, Animation, ModalController, IonSlides, NavController } from '@ionic/angular';

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
  @ViewChild('astraPics') astraSlider: IonSlides;
  @ViewChild('litterAPics') litterASlider: IonSlides;

  showCujoNav = false;
  showKeviNav = false;
  showAstraNav = false;
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
      id: 3,
      url: '../../../assets/cujo/pro/AI6A9014-Cujo-yard.jpg',
      title: 'Cujo in the yard'
    },
    {
      id: 4,
      url: '../../../assets/cujo/pro/AI6A9017-Cujo-sitting-yard.jpg',
      title: 'Cujo sitting in the yard'
    },
    {
      id: 5,
      url: '../../../assets/cujo/pro/AI6A9024-Cujo-Marisa-yard.jpg',
      title: 'Cujo and Marisa'
    },
    {
      id: 6,
      url: '../../../assets/cujo/pro/AI6A9025-Cujo-Marisa-yard.jpg',
      title: 'Cujo and Marisa'
    },
    {
      id: 7,
      url: '../../../assets/cujo/pro/AI6A9014-Cujo-yard.jpg',
      title: 'Cujo in the yard'
    },
    {
      id: 8,
      url: '../../../assets/cujo/pro/AI6A9064-Cujo-Liv-black-chain.jpg',
      title: 'Cujo and Liv'
    },
    {
      id: 9,
      url: '../../../assets/cujo/pro/AI6A9065-Cujo-Liv-black-chain.jpg',
      title: 'Cujo and Liv'
    },
    {
      id: 10,
      url: '../../../assets/cujo/pro/AI6A9080-Cujo-collar-chain.jpg',
      title: 'Cujo enjoying a break'
    },
    {
      id: 11,
      url: '../../../assets/cujo/pro/AI6A9109-Cujo-Liv-deck.jpg',
      title: 'Cujo and Liv on the deck'
    },
    {
      id: 12,
      url: '../../../assets/cujo/pro/AI6A9111-Cujo-Liv-deck.jpg',
      title: 'Cujo and Liv on the deck'
    },
    {
      id: 13,
      url: '../../../assets/cujo/pro/AI6A9114-Cujo-Liv-deck.jpg',
      title: 'Cujo and Liv on the deck'
    },
    {
      id: 14,
      url: '../../../assets/cujo/cujo-child.jpg',
      title: 'Cujo with Child'
    },
    {
      id: 15,
      url: '../../../assets/cujo/cujo-marisa.jpg',
      title: 'Cujo jumping on Marisa'
    }
  ];

  keviImgs = [
    {
      id: 1,
      url: '../../../assets/kevi/kevi-2021-08-05a.jpg',
      title: 'Kevi posing for the camera'
    },
    {
      id: 2,
      url: '../../../assets/kevi/kevi-3.jpg',
      title: 'Kevi'
    },
    {
      id: 3,
      url: '../../../assets/kevi/kevi-2-and-astra.jpg',
      title: 'Kevi and Astra'
    }
  ];

  astraImgs = [
    {
      id: 1,
      url: '../../../assets/astra/astra-1.jpg',
      title: 'Astra relaxing'
    },
    {
      id: 2,
      url: '../../../assets/astra/astra-2.jpg',
      title: 'Astra enjoying some love'
    },
    {
      id: 3,
      url: '../../../assets/astra/astra-3-and-kevi.jpg',
      title: 'Astra and Kevi'
    }
  ];

  litterAImgs = [
    {
      id: 1,
      url: '../../../assets/litterA/litterA-2021-08-05a.jpg',
      title: 'Puppy Greetings'
    },
    {
      id: 3,
      url: '../../../assets/litterA/litterA-2021-08-05e.jpg',
      title: 'Puppies playing'
    },
    {
      id: 4,
      url: '../../../assets/litterA/litterA-2021-08-05f.jpg',
      title: 'Puppies at the pool'
    },
    {
      id: 5,
      url: '../../../assets/litterA/litterA-atFence-2021-07-16.jpg',
      title: 'Puppies at the fence'
    },
    {
      id: 6,
      url: '../../../assets/litterA/pro/AI6A9122-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 7,
      url: '../../../assets/litterA/pro/AI6A9129-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 8,
      url: '../../../assets/litterA/pro/AI6A9130-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 9,
      url: '../../../assets/litterA/pro/AI6A9135-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 10,
      url: '../../../assets/litterA/pro/AI6A9138-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 11,
      url: '../../../assets/litterA/pro/AI6A9140-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 12,
      url: '../../../assets/litterA/pro/AI6A9143-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 13,
      url: '../../../assets/litterA/pro/AI6A9144-Athena-f.jpg',
      title: 'Athena - Female with pink collar'
    },
    {
      id: 14,
      url: '../../../assets/litterA/pro/AI6A9150-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 15,
      url: '../../../assets/litterA/pro/AI6A9151-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 16,
      url: '../../../assets/litterA/pro/AI6A9153-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 17,
      url: '../../../assets/litterA/pro/AI6A9154-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 18,
      url: '../../../assets/litterA/pro/AI6A9157-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 19,
      url: '../../../assets/litterA/pro/AI6A9159-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 20,
      url: '../../../assets/litterA/pro/AI6A9161-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 21,
      url: '../../../assets/litterA/pro/AI6A9163-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 22,
      url: '../../../assets/litterA/pro/AI6A9164-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 23,
      url: '../../../assets/litterA/pro/AI6A9168-Axel-m.jpg',
      title: 'Axel - Male with orange collar'
    },
    {
      id: 24,
      url: '../../../assets/litterA/pro/AI6A9169-AlmondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 25,
      url: '../../../assets/litterA/pro/AI6A9171-AlmondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 26,
      url: '../../../assets/litterA/pro/AI6A9173-AlmondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 27,
      url: '../../../assets/litterA/pro/AI6A9174-AlmondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 28,
      url: '../../../assets/litterA/pro/AI6A9175-AlmondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 29,
      url: '../../../assets/litterA/pro/AI6A9176-AlmondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 30,
      url: '../../../assets/litterA/pro/AI6A9177-AlmondJoy-f.jpg',
      title: 'Almond Joy - Female with yellow collar'
    },
    {
      id: 31,
      url: '../../../assets/litterA/pro/AI6A9178-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 32,
      url: '../../../assets/litterA/pro/AI6A9179-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 33,
      url: '../../../assets/litterA/pro/AI6A9180-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 34,
      url: '../../../assets/litterA/pro/AI6A9181-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 35,
      url: '../../../assets/litterA/pro/AI6A9183-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 36,
      url: '../../../assets/litterA/pro/AI6A9196-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 37,
      url: '../../../assets/litterA/pro/AI6A9198-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 38,
      url: '../../../assets/litterA/pro/AI6A9199-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 39,
      url: '../../../assets/litterA/pro/AI6A9200-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 40,
      url: '../../../assets/litterA/pro/AI6A9201-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 41,
      url: '../../../assets/litterA/pro/AI6A9206-AfricaAfro-m.jpg',
      title: 'Africa (Afro) - Male with green collar'
    },
    {
      id: 42,
      url: '../../../assets/litterA/pro/AI6A9209-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 43,
      url: '../../../assets/litterA/pro/AI6A9210-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 44,
      url: '../../../assets/litterA/pro/AI6A9211-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 45,
      url: '../../../assets/litterA/pro/AI6A9212-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 46,
      url: '../../../assets/litterA/pro/AI6A9213-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 47,
      url: '../../../assets/litterA/pro/AI6A9214-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 48,
      url: '../../../assets/litterA/pro/AI6A9215-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 49,
      url: '../../../assets/litterA/pro/AI6A9222-Atilla-m.jpg',
      title: 'Atilla - Male with red collar'
    },
    {
      id: 50,
      url: '../../../assets/litterA/pro/AI6A9223-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 51,
      url: '../../../assets/litterA/pro/AI6A9224-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 52,
      url: '../../../assets/litterA/pro/AI6A9225-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 53,
      url: '../../../assets/litterA/pro/AI6A9227-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 54,
      url: '../../../assets/litterA/pro/AI6A9228-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 55,
      url: '../../../assets/litterA/pro/AI6A9229-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 56,
      url: '../../../assets/litterA/pro/AI6A9231-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 57,
      url: '../../../assets/litterA/pro/AI6A9232-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 58,
      url: '../../../assets/litterA/pro/AI6A9234-Ali-m.jpg',
      title: 'Ali - Male with black collar'
    },
    {
      id: 59,
      url: '../../../assets/litterA/pro/AI6A9189.jpg',
      title: 'Puppy from Litter A - lavender collar'
    },
    {
      id: 60,
      url: '../../../assets/litterA/pro/AI6A9190.jpg',
      title: 'Puppy from Litter A - lavender collar'
    },
    {
      id: 61,
      url: '../../../assets/litterA/pro/AI6A9191.jpg',
      title: 'Puppy from Litter A - lavender collar'
    },
    {
      id: 62,
      url: '../../../assets/litterA/pro/AI6A9192.jpg',
      title: 'Puppy from Litter A - lavender collar'
    },
    {
      id: 63,
      url: '../../../assets/litterA/pro/AI6A9193.jpg',
      title: 'Puppy from Litter A - lavender collar'
    },
    {
      id: 64,
      url: '../../../assets/litterA/pro/AI6A9185.jpg',
      title: 'Pics of Litter A - July 22, 2021'
    },
    {
      id: 65,
      url: '../../../assets/litterA/pro/AI6A9186.jpg',
      title: 'Pics of Litter A - July 22, 2021'
    },
    {
      id: 66,
      url: '../../../assets/litterA/pro/AI6A9187.jpg',
      title: 'Pics of Litter A - July 22, 2021'
    },
    {
      id: 67,
      url: '../../../assets/litterA/pro/AI6A9188.jpg',
      title: 'Pics of Litter A - July 22, 2021'
    }
  ];

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private navCtrl: NavController,
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

  goToAboutKangals() {
    // this.router.navigate(['about-kangals']);
    this.navCtrl.navigateBack('about-kangals');
  }
}
