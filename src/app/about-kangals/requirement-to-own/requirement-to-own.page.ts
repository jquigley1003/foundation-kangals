import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-requirement-to-own',
  templateUrl: './requirement-to-own.page.html',
  styleUrls: ['./requirement-to-own.page.scss'],
})
export class RequirementToOwnPage implements OnInit {

  constructor(
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
