export class User {

  public Email: string;
  public Password: string;
  public Name: string;
  public LastName: string;
  public City: string;

  constructor(params){
    this.Email = params.Email;
    this.Password = params.Password;
    this.Name = params.Name;
    this.LastName = params.LastName;
    this.City = params.City;
  }
}