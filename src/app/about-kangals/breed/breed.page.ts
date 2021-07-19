import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.page.html',
  styleUrls: ['./breed.page.scss'],
})
export class BreedPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goToAboutKangals() {
    // this.router.navigate(['about-kangals']);
    this.navCtrl.navigateBack('about-kangals');
  }

  goHome() {
    this.navCtrl.navigateBack('/');
  }

}
