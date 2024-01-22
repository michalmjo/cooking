export interface UserInfoData {
  email: string;
  password: string;
}

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string | null,
    private _tokenExpirationDate: Date | null
  ) {}

  get Token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
