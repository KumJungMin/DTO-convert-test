import { JsonProperty } from '../decorators/JsonProperty';

export class AddressDto {
  @JsonProperty('STREET')
  street: string;

  @JsonProperty('CITY')
  city: string;

  constructor(street: string = '', city: string = '') {
    this.street = street;
    this.city = city;
  }
}
