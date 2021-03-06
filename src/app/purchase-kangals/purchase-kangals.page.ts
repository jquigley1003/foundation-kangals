import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-purchase-kangals',
  templateUrl: './purchase-kangals.page.html',
  styleUrls: ['./purchase-kangals.page.scss'],
})
export class PurchaseKangalsPage implements OnInit, AfterViewInit {
  @ViewChild('purchaseTitle') purchaseTitle: ElementRef;

  purchaseTitleAnim: Animation;

  constructor(
    private animationCtrl: AnimationController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.purchaseTitleAnim = this.animationCtrl.create('myPurchaseTitleAnim');
    this.purchaseTitleAnim
      .addElement(this.purchaseTitle.nativeElement)
      .duration(2000)
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    this.purchaseTitleAnim.play();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
