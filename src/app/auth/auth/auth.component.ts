import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AuthService } from './service/auth.service';
import { error } from 'console';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;

  isLoginMode = true;
  isLoading = false;
  error: any = '';
  notificationMessage!: string;
  notifications: string[] = [];
  // W kontrolerze lub usłudze
  getSignUpText(): string {
    return this.isLoginMode ? 'Login' : 'Sign-up';
  }
  getChangeLoginText(): string {
    return this.isLoginMode ? 'register' : 'log-in';
  }

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  addNotification() {
    if (this.notificationMessage) {
      this.notificationService.addNotification(this.notificationMessage);
      this.notificationMessage = 'asdasdsadsdasdsadasd';
    }
  }
  removeNotification(index: any) {
    this.notificationService.removeNotification(index);
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      userDataGroup: new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
      }),
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.get('userDataGroup.email')?.value;
    const password = this.authForm.get('userDataGroup.password')?.value;
    this.isLoading = true;
    if (this.isLoginMode) {
      //...
      console.log('tautaj');
    } else {
      console.log('Tutaj przechodzi dalej');
      console.log(email, password);
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.error = error.message;
          this.notificationService.addNotification(this.error);
          this.isLoading = false;
        }
      );
    }

    console.log(this.authForm.value);
    console.log(this.authForm.valid!);
    this.authForm.reset();
  }
}
