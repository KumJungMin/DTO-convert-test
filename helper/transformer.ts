import { KeyMapping } from './mappings';

/**
 * JSON 객체를 클래스 인스턴스로 변환하는 함수
 * @param cls 클래스 생성자
 * @param plainObj 변환할 JSON 객체
 * @param mappings 키 매핑 배열
 * @param nestedMappings 중첩 객체 매핑 정의
 * @returns 클래스 인스턴스
 */
export function plainToClass<T>(
  cls: { new (): T },
  plainObj: any,
  mappings: KeyMapping[],
  nestedMappings?: { [classKey: string]: KeyMapping[] }
): T {
  const instance = new cls();

  mappings.forEach(mapping => {
    const { jsonKey, classKey } = mapping;
    if (plainObj.hasOwnProperty(jsonKey)) {
      const value = plainObj[jsonKey];
      if (nestedMappings && nestedMappings[classKey]) {
        // 중첩 객체 처리
        const NestedClass = getClassByClassKey(classKey);
        if (NestedClass) {
          (instance as any)[classKey] = plainToClass(
            NestedClass,
            value,
            nestedMappings[classKey],
            nestedMappings
          );
        }
      } else {
        (instance as any)[classKey] = value;
      }
    }
  });

  return instance;
}

/**
 * 클래스 인스턴스를 JSON 객체로 변환하는 함수
 * @param instance 클래스 인스턴스
 * @param mappings 키 매핑 배열
 * @param nestedMappings 중첩 객체 매핑 정의
 * @returns JSON 객체
 */
export function classToPlain<T>(
  instance: T,
  mappings: KeyMapping[],
  nestedMappings?: { [classKey: string]: KeyMapping[] }
): any {
  const plainObj: any = {};

  mappings.forEach(mapping => {
    const { jsonKey, classKey } = mapping;
    if ((instance as any).hasOwnProperty(classKey)) {
      const value = (instance as any)[classKey];
      if (nestedMappings && nestedMappings[classKey]) {
        // 중첩 객체 처리
        plainObj[jsonKey] = classToPlain(
          value,
          nestedMappings[classKey],
          nestedMappings
        );
      } else {
        plainObj[jsonKey] = value;
      }
    }
  });

  return plainObj;
}

/**
 * classKey에 해당하는 클래스를 반환하는 헬퍼 함수
 * 이 함수은 실제 프로젝트에서는 더 동적으로 구현할 수 있습니다.
 * 현재는 하드코딩된 예시입니다.
 */
import { MemberInfoDto } from '../DTO/MemberInfoDto';
import { AddressDto } from '../DTO/AddressDto';

function getClassByClassKey(classKey: string): any {
  const classMap: { [key: string]: any } = {
    memberInfo: MemberInfoDto,
    address: AddressDto,
    street: String, // 예시: 기본 타입은 그대로 반환
    city: String,
  };

  return classMap[classKey];
}