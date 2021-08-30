import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
})
export class PhotoModalComponent implements OnInit {
  @ViewChild('slider', {read: ElementRef})slider: ElementRef;

  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.img = this.navParams.get('img');
  }

  zoomAction(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if(zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
