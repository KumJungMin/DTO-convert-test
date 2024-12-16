import { KeyMapping } from './decorators/JsonProperty';
import MappingRegistry from './mappingRegistry';
import { MemberInfoDto } from './dtos/MemberInfoDto';
import { AddressDto } from './dtos/AddressDto';

/**
 * MemberInfoDto 매핑 정보 등록
 * jsonKey: JSON 데이터의 키 이름
 * classKey: 클래스의 속성 이름
 * -> 만약 json키가 MBR_INFO라면, 키값은 memberInfo로 매핑됩니다.
*/
const memberInfoMappings: KeyMapping[] = [
  { jsonKey: 'MBR_INFO', classKey: 'memberInfo' },
  { jsonKey: 'ADDRESS', classKey: 'address' },
];

MappingRegistry.registerMapping(MemberInfoDto, memberInfoMappings);

// AddressDto 매핑 정보 등록
const addressMappings: KeyMapping[] = [
  { jsonKey: 'STREET', classKey: 'street' },
  { jsonKey: 'CITY', classKey: 'city' },
];

MappingRegistry.registerMapping(AddressDto, addressMappings);
