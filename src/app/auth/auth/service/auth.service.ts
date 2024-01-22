import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { UserInfo } from 'os';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User, UserInfoData } from 'src/app/data/models/user-info.model';
import { AppConfig } from 'src/app/core/models/app-config.interface';
import { ErrorCodes } from 'src/app/shared/enums/error-codes.enum';

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

  user = new BehaviorSubject<User | null>(null);

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
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(data: UserInfoData) {
    return this.http
      .post<AuthResponseData>(
        `${this.config.apiUrl}/accounts:signInWithPassword?key=${this.API_key}`,
        {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      console.log(errorRes);
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case ErrorCodes.EmailExists:
        errorMessage = 'This email exists already';
        break;
      case ErrorCodes.EmailNotFound:
        errorMessage = 'This email does not exist';
        break;
      case ErrorCodes.InvalidPassword:
        errorMessage = 'INvalid Password';
        break;
      case ErrorCodes.InvalidLoginCredentials:
        errorMessage = 'Invalid login credentials';
        break;
    }
    console.log(errorRes);
    return throwError(errorMessage);
  }

  handleAuth(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
  }
}
