// src/mappingRegistry.ts
import { EnhancedKeyMapping } from './decorators/JsonProperty';

/**
 * 매핑 레지스트리를 관리하는 클래스 (싱글톤 패턴)
 */
class MappingRegistry {
  private static instance: MappingRegistry;
  private mappings: Map<Function, EnhancedKeyMapping[]> = new Map();

  private constructor() {}

  /**
   * 매핑 레지스트리 인스턴스 반환
   */
  static getInstance(): MappingRegistry {
    if (!MappingRegistry.instance) {
      MappingRegistry.instance = new MappingRegistry();
    }
    return MappingRegistry.instance;
  }

  /**
   * 클래스에 대한 매핑 정보를 등록
   * @param cls 클래스 생성자
   * @param mappings 매핑 정보 배열
   */
  registerMapping(cls: Function, mappings: EnhancedKeyMapping[]) {
    this.mappings.set(cls, mappings);
  }

  /**
   * 클래스에 대한 매핑 정보를 가져옴
   * @param cls 클래스 생성자
   * @returns 매핑 정보 배열
   */
  getMappings(cls: Function): EnhancedKeyMapping[] | undefined {
    return this.mappings.get(cls);
  }
}

export default MappingRegistry.getInstance();
