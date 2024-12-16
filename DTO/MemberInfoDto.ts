import { AddressDto } from './AddressDto';

export class MemberInfoDto {
  memberInfo: string;
  address: AddressDto;

  constructor(memberInfo: string = '', address: AddressDto = new AddressDto()) {
    this.memberInfo = memberInfo;
    this.address = address;
  }
}