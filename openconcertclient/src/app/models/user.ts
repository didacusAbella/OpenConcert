export class User {

  public email: string;
  public password: string;
  public name: string;
  public lastName: string;
  public city: string;

  constructor(params){
    this.email = params.email;
    this.password = params.password;
    this.name = params.name;
    this.lastName = params.lastName;
    this.city = params.city;
  }
}