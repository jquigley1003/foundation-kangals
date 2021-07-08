import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
}
