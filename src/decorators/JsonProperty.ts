import 'reflect-metadata';
import MappingRegistry from '../mappingRegistry';

const JSON_PROPERTY_KEY = Symbol('jsonProperty');

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
    Reflect.defineMetadata(JSON_PROPERTY_KEY, { jsonKey, type }, target, propertyKey);

    const cls = target.constructor;
    const mappings: KeyMapping[] = MappingRegistry.getMappings(cls) || [];

    mappings.push({ jsonKey, classKey: propertyKey, type });
    MappingRegistry.registerMapping(cls, mappings);
  };
}