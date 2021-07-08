import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

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
    private router: Router
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
}
