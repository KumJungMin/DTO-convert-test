export interface KeyMapping {
  jsonKey: string;
  classKey: string;
}

// 각 DTO에 대한 매핑 정의
export const memberInfoMappings: KeyMapping[] = [
  { jsonKey: 'MBR_INFO', classKey: 'memberInfo' },
  { jsonKey: 'ADDRESS', classKey: 'address' },
];

export const addressMappings: KeyMapping[] = [
  { jsonKey: 'STREET', classKey: 'street' },
  { jsonKey: 'CITY', classKey: 'city' },
];