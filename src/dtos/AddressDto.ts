import { JsonProperty } from '../decorators/JsonProperty';

export class AddressDto {
  /** 
   * @JsonProperty 데코레이터를 사용하여 JSON 키와 클래스 속성을 매핑합니다.
   * @param jsonKey JSON에서 사용할 키 이름
   * @param type 중첩 객체의 클래스 타입 또는 배열 요소의 클래스 타입 (선택 사항)
   * STREET라는 키 이름을 가진 JSON 데이터를 street 속성에 매핑합니다.
   * */ 
  @JsonProperty('STREET')
  street: string;

  @JsonProperty('CITY')
  city: string;

  constructor(street: string = '', city: string = '') {
    this.street = street;
    this.city = city;
  }
}
