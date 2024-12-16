import 'reflect-metadata';
import MappingRegistry from '../mappingRegistry';

const JSON_PROPERTY_KEY = Symbol('jsonProperty');

/**
 * EnhancedKeyMapping 인터페이스 정의
 */
export interface EnhancedKeyMapping {
  jsonKey: string;
  classKey: string;
  type?: Function;
}

/**
 * @JsonProperty 데코레이터
 * @param jsonKey JSON에서 사용할 키 이름
 * @param type 중첩 객체의 클래스 타입 또는 배열 요소의 클래스 타입 (선택 사항)
 */
export function JsonProperty(jsonKey: string, type?: Function) {
  return function (target: any, propertyKey: string) {
    // 메타데이터 정의
    Reflect.defineMetadata(JSON_PROPERTY_KEY, { jsonKey, type }, target, propertyKey);

    // 클래스 생성자 가져오기
    const cls = target.constructor;

     // 기존 매핑 정보 가져오기
    const mappings: EnhancedKeyMapping[] = MappingRegistry.getMappings(cls) || [];

     // 새로운 매핑 정보 추가
    mappings.push({ jsonKey, classKey: propertyKey, type });

     // 매핑 레지스트리에 등록
    MappingRegistry.registerMapping(cls, mappings);
  };
}