import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-about-kangals',
  templateUrl: './about-kangals.page.html',
  styleUrls: ['./about-kangals.page.scss'],
})
export class AboutKangalsPage implements OnInit, AfterViewInit {
  @ViewChild('aboutTitle') aboutTitle: ElementRef;

  aboutTitleAnim: Animation;

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.aboutTitleAnim = this.animationCtrl.create('myAboutTitleAnim');
    this.aboutTitleAnim 
      .addElement(this.aboutTitle.nativeElement)
      .duration(2000)
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    this.aboutTitleAnim.play();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToBreed() {
    this.router.navigate(['about-kangals/breed']);
  }

  goToPhotos() {
    this.router.navigate(['about-kangals/photos']);
  }

  async testClick() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'About Kangals',
      subHeader: 'More Information will go here',
      message: 'This is a test message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
