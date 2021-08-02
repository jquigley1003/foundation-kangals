import { Component, ViewChild } from '@angular/core';
import { IonList, IonMenu } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonMenu) ionMenu: IonMenu;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'paw'
    },
    {
      title: 'About Kangals',
      url: '/about-kangals',
      icon: 'information-circle'
    },
    {
      title: 'Purchase Kangals',
      url: '/purchase-kangals',
      icon: 'heart'
    }
  ];
  constructor() {}

  closeMenu() {
    this.ionMenu.close();
  }
}
