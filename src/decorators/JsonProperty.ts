import 'reflect-metadata';
import MappingRegistry from '../mappingRegistry';

const JSON_PROPERTY_KEY = Symbol('jsonProperty');

/**
 * KeyMapping 인터페이스 정의
 */
export interface KeyMapping {
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
    /** 
     * 메타데이터(데이터에 관한 구조화된 데이터) 정의
     * Reflect.defineMetadata(메타 데이터 키, 값, 메타데이터가 적용될 대상, 속성)
     * 객체나 속성에 메타데이터를 추가합니다.
     * 메타데이터는 런타임에 특정 속성에 대한 정보를 저장하거나, 데코레이터를 통해 런타임 로직을 쉽게 확장하는 데 활용됩니다.
     * TypeScript에서 reflect-metadata 패키지와 함께 자주 사용됩니다.
     * 주로 직렬화/역직렬화, 의존성 주입, 런타임 검증 등에 사용됩니다.
     */
    Reflect.defineMetadata(JSON_PROPERTY_KEY, { jsonKey, type }, target, propertyKey);

    // 클래스 생성자 가져오기
    const cls = target.constructor;

     // 기존 매핑 정보 가져오기
    const mappings: KeyMapping[] = MappingRegistry.getMappings(cls) || [];

     // 새로운 매핑 정보 추가
    mappings.push({ jsonKey, classKey: propertyKey, type });

     // 매핑 레지스트리에 등록
     // : 클래스 생성자와 매핑 정보 배열을 등록
    MappingRegistry.registerMapping(cls, mappings);
  };
}