import MappingRegistry from './mappingRegistry';
import { MappingError } from './errors/MappingError';

/**
 * JSON 객체를 클래스 인스턴스로 변환하는 함수 (향상된 버전)
 * @param cls 클래스 생성자
 * @param plainObj 변환할 JSON 객체
 * @returns 클래스 인스턴스
 */
export function plainToClassDynamic<T>(cls: new () => T, plainObj: any): T {
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
        /** 
         * Reflect.getMetadata(메타데이터 키, 대상, 속성)
         * 객체나 속성에 저장된 메타데이터를 가져옵니다.
         * - design:type': TypeScript 컴파일러가 자동으로 생성한 메타데이터 키로, 속성의 타입을 나타냅니다.
         * - instance: 메타데이터를 가져올 대상 객체입니다.
         * - classKey: 메타데이터를 가져올 속성 이름입니다.
         * */ 
        const propertyType = Reflect.getMetadata('design:type', instance as any, classKey);

        if (type) {
          const isArray = propertyType === Array && Array.isArray(value)
          if (isArray) {
            if (!type) {
              throw new MappingError(`Type information is missing for array property '${classKey}'`);
            }
            // 배열 요소 타입으로 변환
            (instance as any)[classKey] = value.map((item: any) => {
              return plainToClassDynamic(type as any, item);
            });
          } else {
            // 중첩된 객체인지 확인 - 재귀적으로 변환
            (instance as any)[classKey] = plainToClassDynamic(type as any, value);
          }
        } else {
          // 기본 타입 처리 (string, number, boolean, Date 등)
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
export function classToPlainDynamic<T>(instance: T): any {
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
            // 배열 요소 타입으로 변환
            plainObj[jsonKey] = value.map((item: any) => {
              return classToPlainDynamic(item);
            });
          }
          else {
            // 재귀적으로 변환
            plainObj[jsonKey] = classToPlainDynamic(value);
          }
        } else {
          // 기본 타입 처리
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