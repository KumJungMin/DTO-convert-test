import { JsonProperty } from '../decorators/JsonProperty';
import { AddressDto } from './AddressDto';

export class MemberInfoDto {
  @JsonProperty('MBR_INFO')
  memberInfo: string;

  @JsonProperty('ADDRESS')
  address: AddressDto;

  constructor(memberInfo: string = '', address: AddressDto = new AddressDto()) {
    this.memberInfo = memberInfo;
    this.address = address;
  }
}
