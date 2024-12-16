import MappingRegistry from './mappingRegistry';

/**
 * JSON 객체를 클래스 인스턴스로 변환하는 함수
 * @param cls 클래스 생성자
 * @param plainObj 변환할 JSON 객체
 * @returns 클래스 인스턴스
 */
export function plainToClassDynamic<T>(cls: new () => T, plainObj: any): T {
  const instance = new cls() as any;
  const mappings = MappingRegistry.getMappings(cls);

  if (!mappings) {
    throw new Error(`No mappings registered for class ${cls.name}`);
  }

  mappings.forEach((mapping) => {
    const { jsonKey, classKey } = mapping;
    const value = plainObj[jsonKey];

    if (value !== undefined) {
      const propertyType = Reflect.getMetadata('design:type', instance, classKey);

      // 중첩된 객체인지 확인
      if (typeof propertyType === 'function' && propertyType !== String && propertyType !== Number && propertyType !== Boolean && propertyType !== Date) {
        // 재귀적으로 변환
        instance[classKey] = plainToClassDynamic(propertyType, value);
      } else {
        instance[classKey] = value;
      }
    }
  });

  return instance;
}

/**
 * 클래스 인스턴스를 JSON 객체로 변환하는 함수
 * @param instance 클래스 인스턴스
 * @returns JSON 객체
 */
export function classToPlainDynamic<T>(instance: T): any {
  const cls = (instance as any).constructor;
  const mappings = MappingRegistry.getMappings(cls);

  if (!mappings) {
    throw new Error(`No mappings registered for class ${cls.name}`);
  }

  const plainObj: any = {};

  mappings.forEach((mapping) => {
    const { jsonKey, classKey } = mapping;
    const value = (instance as any)[classKey];

    if (value !== undefined) {
      const propertyType = Reflect.getMetadata('design:type', instance as any, classKey);

      if (typeof propertyType === 'function' && propertyType !== String && propertyType !== Number && propertyType !== Boolean && propertyType !== Date) {
        // 재귀적으로 변환
        plainObj[jsonKey] = classToPlainDynamic(value);
      } else {
        plainObj[jsonKey] = value;
      }
    }
  });

  return plainObj;
}
