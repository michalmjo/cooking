import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
  static password(control: AbstractControl): null | any {
    const password = control.value && control.value.toString();
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[@#$%^&*]/.test(password);
    const isValid =
      password && password.length >= 6 && hasUpperCase && hasSpecialChar;

    if (!isValid) {
      return { passwordError: true };
    }

    return null;
  }
}
