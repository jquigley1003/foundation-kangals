import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { LoadingService } from '../../notify/loading.service';
import { AlertService } from '../../notify/alert.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  registerForm: FormGroup;
  passwordType = 'password';
  passwordShow = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', (Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'))],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onRegisterForm() {
    const firstName = this.registerForm.value.firstName.trim();
    const lastName = this.registerForm.value.lastName.trim();
    const email = this.registerForm.value.email.trim();
    const password = this.registerForm.value.password.trim();
    const data = {
      email,
      password,
      firstName,
      lastName
    };

    await this.loadingService.presentLoading(
      'Registering in process...', 'bubbles', 15000);

    await this.authService.register(data)
    .then(async () => {
      this.loadingService.dismissLoading();
      this.router.navigate(['/home']);
      this.authService.signOut();
    }, async err => {
      this.loadingService.dismissLoading();
      await this.alertService.presentAlert(
        'Registering Did Not Complete','please try again', err.message, ['OK']
      );
    });
    this.registerForm.reset();
    await this.modalCtrl.dismiss();
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

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
