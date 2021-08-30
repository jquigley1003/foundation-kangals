import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  async presentToast(message: string, position: any, buttons: any, duration: number) {
    const toast = await this.toastCtrl.create({
      cssClass: 'my-custom-class',
      message,
      position,
      buttons,
      duration
    });
    toast.present();
  }
}
