export class Locale {

  public name: string;
  public number: string;
  public city: string;

  constructor(parameters) {
    this.name = parameters.name;
    this.number = parameters.number;
    this.city = parameters.city;
  }
}