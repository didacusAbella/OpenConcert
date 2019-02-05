export class Token {
  public token: string;
  public auth: boolean;

  constructor(params) {
    this.token = params.token;
    this.auth = params.auth;
  }
}