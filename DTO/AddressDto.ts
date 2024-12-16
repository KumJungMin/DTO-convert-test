export class AddressDto {
  street: string;
  city: string;

  constructor(street: string = '', city: string = '') {
    this.street = street;
    this.city = city;
  }
}