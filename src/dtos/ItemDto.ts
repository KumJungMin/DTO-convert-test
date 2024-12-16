import { JsonProperty } from '../decorators/JsonProperty';

export class ItemDto {
  @JsonProperty('ITEM_NAME')
  itemName: string;

  @JsonProperty('QUANTITY')
  quantity: number;

  constructor(itemName: string = '', quantity: number = 0) {
    this.itemName = itemName;
    this.quantity = quantity;
  }
}