export interface KeyMapping {
  jsonKey: string;
  classKey: string;
}

// 필요한 매핑을 배열로 정의
export const memberInfoMapping: KeyMapping[] = [
  { jsonKey: 'MBR_INFO', classKey: 'memberInfo' },
];