import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async presentLoading(message: string, spinner: any, duration: number) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner,
      duration,
    });
    return await loading.present();
  }

  dismissLoading() {
    this.loadingCtrl.dismiss();
  }
}
