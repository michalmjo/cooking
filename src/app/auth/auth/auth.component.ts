import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AuthService } from './service/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;

  isLoginMode = true;
  // W kontrolerze lub usłudze
  getSignUpText(): string {
    return this.isLoginMode ? 'Login' : 'Sign-up';
  }
  getChangeLoginText(): string {
    return this.isLoginMode ? 'register' : 'log-in';
  }

  constructor(private authService: AuthService) {}

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

    if (this.isLoginMode) {
      //...
      console.log('tautaj');
    } else {
      console.log('Tutaj przechodzi dalej');
      console.log(email, password);
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    console.log(this.authForm.value);
    console.log(this.authForm.valid!);
    this.authForm.reset();
  }
}
