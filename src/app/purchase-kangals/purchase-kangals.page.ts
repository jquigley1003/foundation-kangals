import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-purchase-kangals',
  templateUrl: './purchase-kangals.page.html',
  styleUrls: ['./purchase-kangals.page.scss'],
})
export class PurchaseKangalsPage implements OnInit, AfterViewInit {
  @ViewChild('purchasersTitle') purchasersTitle: ElementRef;

  purchasersTitleAnim: Animation;

  constructor(
    private animationCtrl: AnimationController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.purchasersTitleAnim = this.animationCtrl.create('myPurchasersTitleAnim');
    this.purchasersTitleAnim 
      .addElement(this.purchasersTitle.nativeElement)
      .duration(2000)
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    this.purchasersTitleAnim.play();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
