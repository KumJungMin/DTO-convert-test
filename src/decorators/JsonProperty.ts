import 'reflect-metadata';

const JSON_PROPERTY_KEY = Symbol('jsonProperty');

export interface KeyMapping {
  jsonKey: string;
  classKey: string;
}

/**
 * @JsonProperty 데코레이터
 * @param jsonKey JSON에서 사용할 키 이름
 */
export function JsonProperty(jsonKey: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(JSON_PROPERTY_KEY, jsonKey, target, propertyKey);
  };
}

/**
 * 해당 프로퍼티의 JSON 키를 가져오는 헬퍼 함수
 * @param target 클래스 인스턴스
 * @param propertyKey 프로퍼티 이름
 * @returns JSON 키 이름
 */
export function getJsonProperty(target: any, propertyKey: string): string | undefined {
  return Reflect.getMetadata(JSON_PROPERTY_KEY, target, propertyKey);
}

/**
 * 클래스의 모든 프로퍼티에 대한 JSON 매핑 정보를 가져오는 함수
 * @param cls 클래스 생성자
 * @returns 매핑 정보 객체
 */
export function getClassMappings(cls: any): { [key: string]: string } {
  const mappings: { [key: string]: string } = {};
  const propertyNames = Object.getOwnPropertyNames(cls.prototype);

  propertyNames.forEach((propertyKey) => {
    const jsonKey = getJsonProperty(cls.prototype, propertyKey);
    if (jsonKey) {
      mappings[propertyKey] = jsonKey;
    }
  });

  return mappings;
}