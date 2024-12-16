import { JsonProperty } from '../decorators/JsonProperty';
import { AddressDto } from './AddressDto';
import { ItemDto } from './ItemDto';

export class MemberInfoDto {
  @JsonProperty('MBR_INFO')
  memberInfo: string;

  @JsonProperty('ADDRESS', AddressDto)
  address: AddressDto;

  @JsonProperty('ITEMS', ItemDto)
  items: ItemDto[];

  constructor(
    memberInfo: string = '',
    address: AddressDto = new AddressDto(),
    items: ItemDto[] = []
  ) {
    this.memberInfo = memberInfo;
    this.address = address;
    this.items = items;
  }
}