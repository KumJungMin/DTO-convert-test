// transformer.ts
import { KeyMapping } from './mappings';

/**
 * JSON 객체를 클래스 인스턴스로 변환하는 함수
 * @param cls 클래스 생성자
 * @param plainObj 변환할 JSON 객체
 * @param mappings 키 매핑 배열
 * @returns 클래스 인스턴스
 */
export function plainToClass<T>(
  cls: { new (...args: any[]): T },
  plainObj: any,
  mappings: KeyMapping[]
): T {
  const instance = new cls('');

  mappings.forEach(mapping => {
    if (plainObj.hasOwnProperty(mapping.jsonKey)) {
      (instance as any)[mapping.classKey] = plainObj[mapping.jsonKey];
    }
  });

  return instance;
}

/**
 * 클래스 인스턴스를 JSON 객체로 변환하는 함수
 * @param instance 클래스 인스턴스
 * @param mappings 키 매핑 배열
 * @returns JSON 객체
 */
export function classToPlain<T>(
  instance: T,
  mappings: KeyMapping[]
): any {
  const plainObj: any = {};

  mappings.forEach(mapping => {
    if ((instance as any).hasOwnProperty(mapping.classKey)) {
      plainObj[mapping.jsonKey] = (instance as any)[mapping.classKey];
    }
  });

  return plainObj;
}
