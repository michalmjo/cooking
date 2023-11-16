import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { UserInfo } from 'os';
import { catchError, tap, throwError } from 'rxjs';
import { UserInfoData } from 'src/app/data/models/user-info.model';
import { AppConfig } from 'src/app/core/models/app-config.interface';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_key = 'AIzaSyCQ96778DWRU__yRgl91J0qcWyFQilqNOo';

  private config: AppConfig;

  constructor(private http: HttpClient) {
    this.config = {
      apiUrl: 'https://identitytoolkit.googleapis.com/v1',
    };
  }

  signUp(data: UserInfoData) {
    return this.http
      .post<AuthResponseData>(
        `${this.config.apiUrl}/accounts:signUp?key=${this.API_key}`,
        {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError((errorRes) => {
          let errorMessage = 'An unknow error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            console.log(errorRes);
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
          }
          console.log(errorRes);
          return throwError(errorMessage);
        })
      );
  }

  login(data: UserInfoData) {
    return this.http.post<AuthResponseData>(
      `${this.config.apiUrl}/accounts:signInWithPassword?key=${this.API_key}`,
      {
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }
    );
  }
}
