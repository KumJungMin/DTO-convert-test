import MappingRegistry from './mappingRegistry';
import { MappingError } from './errors/MappingError';

/**
 * JSON 객체를 클래스 인스턴스로 변환하는 함수
 * @param cls 클래스 생성자
 * @param plainObj 변환할 JSON 객체
 * @returns 클래스 인스턴스
 */
export function plainToClass<T>(cls: new () => T, plainObj: any): T {
  const instance = new cls();
  const mappings = MappingRegistry.getMappings(cls);

  if (!mappings) {
    throw new MappingError(`No mappings registered for class ${cls.name}`);
  }

  mappings.forEach((mapping) => {
    const { jsonKey, classKey, type } = mapping;
    const value = plainObj[jsonKey];

    if (value !== undefined) {
      try {
        const propertyType = Reflect.getMetadata('design:type', instance as any, classKey);

        if (type) {
          const isArray = propertyType === Array && Array.isArray(value)
          if (isArray) {
            if (!type) {
              throw new MappingError(`Type information is missing for array property '${classKey}'`);
            }
            (instance as any)[classKey] = value.map((item: any) => {
              return plainToClass(type as any, item);
            });
          } else {
            (instance as any)[classKey] = plainToClass(type as any, value);
          }
        } else {
          if (propertyType === Date) {
            (instance as any)[classKey] = new Date(value);
          } else {
            (instance as any)[classKey] = value;
          }
        }
      } catch (error: any) {
        console.error(`Error mapping property '${classKey}':`, error);
        throw new MappingError(`Failed to map property '${classKey}': ${error.message}`);
      }
    }
  });

  return instance;
}

/**
 * 클래스 인스턴스를 JSON 객체로 변환하는 함수 (향상된 버전)
 * @param instance 클래스 인스턴스
 * @returns JSON 객체
 */
export function classToPlain<T>(instance: T): any {
  const cls = (instance as any).constructor;
  const mappings = MappingRegistry.getMappings(cls);

  if (!mappings) {
    throw new MappingError(`No mappings registered for class ${cls.name}`);
  }

  const plainObj: any = {};

  mappings.forEach((mapping) => {
    const { jsonKey, classKey, type } = mapping;
    const value = (instance as any)[classKey];

    if (value !== undefined) {
      try {
        const propertyType = Reflect.getMetadata('design:type', instance as any, classKey);
        if (type) {
          const isArray = propertyType === Array && Array.isArray(value)
          if (isArray) {
            if (!type) {
              throw new MappingError(`Type information is missing for array property '${classKey}'`);
            }
            plainObj[jsonKey] = value.map((item: any) => {
              return classToPlain(item);
            });
          }
          else {
            plainObj[jsonKey] = classToPlain(value);
          }
        } else {
          if (propertyType === Date) {
            (plainObj as any)[jsonKey] = (value as Date).toISOString();
          } else {
            (plainObj as any)[jsonKey] = value;
          }
        }
      } catch (error: any) {
        console.error(`Error mapping property '${classKey}':`, error);
        throw new MappingError(`Failed to map property '${classKey}': ${error.message}`);
      }
    }
  });

  return plainObj;
}