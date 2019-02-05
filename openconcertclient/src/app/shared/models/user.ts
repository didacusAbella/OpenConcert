export class User {

  public email: string;
  public password: string;
  public name: string;
  public lastname: string;
  public city: string;

  constructor(params){
    this.email = params.email;
    this.password = params.password;
    this.name = params.name;
    this.lastname = params.lastname;
    this.city = params.city;
  }
}