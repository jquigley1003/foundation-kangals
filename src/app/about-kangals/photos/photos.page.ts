import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit, AfterViewInit {
  @ViewChild('photosTitle') photosTitle: ElementRef;

  photosTitleAnim: Animation;

  constructor(
    private animationCtrl: AnimationController,
    private router: Router
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

  goHome() {
    this.router.navigate(['/home']);
  }
}
