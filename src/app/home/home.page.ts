import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation, IonSlides } from '@ionic/angular';
import { DetectMobileService } from '../shared/services/detect-mobile.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('logoImg',{ read: ElementRef }) logoImg: ElementRef;
  @ViewChild('mySlideImg1') mySlideImg1: ElementRef;
  @ViewChild('mySlideImg2') mySlideImg2: ElementRef;
  @ViewChild('mySlideImg3') mySlideImg3: ElementRef;
  @ViewChild('mySlideImg4') mySlideImg4: ElementRef;
  @ViewChild('mySlideImg5') mySlideImg5: ElementRef;
  @ViewChild('mySlideImg6') mySlideImg6: ElementRef;
  @ViewChild('aboutKangals') myAboutKangals: ElementRef;
  @ViewChild('purchaseKangals') myPurchaseKangals: ElementRef;

  logoFullAnim: Animation;
  aboutKangalsAnim: Animation;
  purchaseKangalsAnim: Animation;
  enableScroll: boolean;

  slideOpts = {
    autoplay: {
      delay: 7000,
    },
    loop: true,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) {
            tx -= swiper.translate;
          }
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) {
              return;
            }
            if (!swiper || swiper.destroyed) {
              return;
            }
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  };

  constructor(
    private animationCtrl: AnimationController,
    private detectMobileService: DetectMobileService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.logoFullAnim.play();
  }

  ngOnInit() {
    this.detectMobileService.checkForMobile();
  }

  ngAfterViewInit() {
    this.logoFullAnim = this.animationCtrl.create('myLogoFullAnim')
    .addElement(this.logoImg.nativeElement)
    .duration(7000)
    .keyframes([
      { offset: 0, transform: 'scale(0.1)', opacity: 0 },
      { offset: 0.3, transform: 'scale(0.5)', opacity: 0.7 },
      { offset: 0.6, transform: 'scale(0.9)', opacity: 1 },
      { offset: 0.8, transform: 'scale(0.7)', opacity: 1 },
      { offset: 1, transform: 'scale(0.4) translate(-70%, -55%)', opacity: 1 }
    ]);
    // this.logoFullAnim.play();

    if(this.detectMobileService.hasTouchScreen) {
      this.enableScroll = true;
      console.log('This device is mobile. Mobile = ', this.detectMobileService.hasTouchScreen);
    } else {
      this.enableScroll = false;
      console.log('This device is desktop. Mobile = ', this.detectMobileService.hasTouchScreen);
    }

    this.aboutKangalsAnim = this.animationCtrl.create('myAboutKangalsAnim');
    this.aboutKangalsAnim
      .addElement(this.myAboutKangals.nativeElement)
      .duration(7000)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(2)' },
        { offset: 1, transform: 'scale(1)' }
      ]);

    this.purchaseKangalsAnim = this.animationCtrl.create('myPurchaseKangalsAnim');
    this.purchaseKangalsAnim
      .addElement(this.myPurchaseKangals.nativeElement)
      .duration(7000)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(2)' },
        { offset: 1, transform: 'scale(1)' }
      ]);
  }

  async aboutKangalsHover() {
    await this.stopAllMenuAnimations();
    this.aboutKangalsAnim.play();
  }

  async purchaseKangalsHover() {
    await this.stopAllMenuAnimations();
    this.purchaseKangalsAnim.play();
  }

  stopAllMenuAnimations() {
    this.aboutKangalsAnim.stop();
    this.purchaseKangalsAnim.stop();
  }

  goToAboutKangals() {
    this.router.navigate(['/about-kangals']);
  }

  goToPurchaseKangals() {
    this.router.navigate(['/purchase-kangals']);
  }
}
