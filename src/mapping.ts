import { KeyMapping } from './decorators/JsonProperty';
import MappingRegistry from './mappingRegistry';
import { MemberInfoDto } from './dtos/MemberInfoDto';
import { AddressDto } from './dtos/AddressDto';

const memberInfoMappings: KeyMapping[] = [
  { jsonKey: 'MBR_INFO', classKey: 'memberInfo' },
  { jsonKey: 'ADDRESS', classKey: 'address' },
];

MappingRegistry.registerMapping(MemberInfoDto, memberInfoMappings);

const addressMappings: KeyMapping[] = [
  { jsonKey: 'STREET', classKey: 'street' },
  { jsonKey: 'CITY', classKey: 'city' },
];

MappingRegistry.registerMapping(AddressDto, addressMappings);
