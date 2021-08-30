import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { LoadingService } from '../../notify/loading.service';
import { AlertService } from '../../notify/alert.service';
import { ToastService } from '../../notify/toast.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent implements OnInit {
  signInForm: FormGroup;
  passwordType = 'password';
  passwordShow = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.pattern('.+\@.+\..+'))],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {}

  async onSignInForm() {
    const email = this.signInForm.value.email.trim();
    const password = this.signInForm.value.password.trim();

    const data = {
      email,
      password
    };

    const loading = await this.loadingService.presentLoading(
      'Signing In, Please Wait...', 'bubbles', 15000);
    this.authService.signIn(data)
    .then(async (res) => {
      this.loadingService.dismissLoading();
      if (res.user.emailVerified) {
        await this.toastService.presentToast(
          'You Have Signed In Successfully!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
              this.router.navigate(['/home']);
            }
          }],
          3000
        );
        this.router.navigate(['/home']);
      } else {
        this.alertService.presentAlert(
          'To Sign In, Verify Your Email First',
          'Please Check Your Mailbox',
          'Click the link on the email we sent you for verification',
          [{
              text: 'OK',
              cssClass: 'modal-button-primary',
              role: 'cancel',
              handler: () => {
                this.authService.signOut();
                this.router.navigate(['/home']);
              }
            },
            {
              text: 'Resend Email',
              cssClass: 'modal-button-secondary',
              handler: () => {
                res.user.sendEmailVerification();
                this.router.navigate(['/home']);
                console.log('Resent verification email');
              }
            }
          ]
        );
        this.router.navigate(['/home']);
      }
    }, async err => {
      this.loadingService.dismissLoading();
      await this.alertService.presentAlert(
        'Sign In Error','please try again', err.message, ['OK']
      );
    });
    this.signInForm.reset();
    await this.modalCtrl.dismiss();
  }

  async onSignOut() {
    await this.authService.signOut()
    .then(async () => {
      await this.toastService.presentToast(
        'You Have Signed Out.',
        'middle',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
            this.router.navigate(['/home']);
          }
        }],
        3000
      );
      this.router.navigate(['/home']);
    });
    this.modalCtrl.dismiss();
  }

  togglePassword() {
    if(this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
