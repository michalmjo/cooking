import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';

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

  constructor() {}

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
    console.log(this.authForm.value);
    this.authForm.reset();
  }
}
