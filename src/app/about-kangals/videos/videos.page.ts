import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';

import Player from '@vimeo/player';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit, AfterViewInit {

  @ViewChild('cujoVideo01') cujoVideo01: ElementRef;
  @ViewChild('cujoVideo02') cujoVideo02: ElementRef;
  @ViewChild('cujoVids') cujoSlider: IonSlides;

  @ViewChild('litterAVideo01') litterAVideo01: ElementRef;
  @ViewChild('litterAVideo02') litterAVideo02: ElementRef;
  @ViewChild('litterAVideo03') litterAVideo03: ElementRef;
  @ViewChild('litterAVideo04') litterAVideo04: ElementRef;
  @ViewChild('litterAVideo05') litterAVideo05: ElementRef;
  @ViewChild('litterAVids') litterASlider: IonSlides;

  cujoPlayer01: Player;
  cujoPlayer02: Player;
  litterAPlayer01: Player;
  litterAPlayer02: Player;
  litterAPlayer03: Player;
  litterAPlayer04: Player;
  litterAPlayer05: Player;

  showCujoNav = false;
  showLitterANav = false;

  sliderOpts = {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, classSlidePaginatione) =>
       '<span class="' + classSlidePaginatione + '">' + (index + 1) + '</span>',
    }
  };

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cujoPlayer01 = new Player(this.cujoVideo01.nativeElement, {
      id: 582232011,
      height: 350
    });

    this.cujoPlayer02 = new Player(this.cujoVideo02.nativeElement, {
      id: 582232011,
      height: 350
    });

    this.litterAPlayer01 = new Player(this.litterAVideo01.nativeElement, {
      id: 582625119,
      height: 350
    });

    this.litterAPlayer02 = new Player(this.litterAVideo02.nativeElement, {
      id: 582625164,
      height: 350
    });

    this.litterAPlayer03 = new Player(this.litterAVideo03.nativeElement, {
      id: 582625238,
      height: 350
    });

    this.litterAPlayer04 = new Player(this.litterAVideo04.nativeElement, {
      id: 582625284,
      height: 350
    });

    this.litterAPlayer05 = new Player(this.litterAVideo05.nativeElement, {
      id: 582625357,
      height: 350
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
    this.navCtrl.navigateBack('about-kangals');
  }
}
