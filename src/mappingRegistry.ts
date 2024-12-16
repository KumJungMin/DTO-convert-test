import { KeyMapping } from './decorators/JsonProperty';

/**
 * 매핑 레지스트리를 관리하는 클래스 (싱글톤 패턴)
 */
class MappingRegistry {
  private static instance: MappingRegistry;
  private mappings: Map<Function, KeyMapping[]> = new Map();

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
   * -> 클래스 생성자와 매핑 정보 배열을 등록합니다.
   * -> 클래스 생성자는 키로 사용되고, 매핑 정보 배열은 값으로 사용됩니다.
   */
  registerMapping(cls: Function, mappings: KeyMapping[]) {
    this.mappings.set(cls, mappings);
  }

  /**
   * 클래스에 대한 매핑 정보를 가져옴
   * @param cls 클래스 생성자
   * @returns 매핑 정보 배열
   * -> 클래스 생성자에 대한 매핑 정보 배열을 반환합니다.
   * -> 클래스 생성자가 등록되지 않은 경우 undefined를 반환합니다.
   */
  getMappings(cls: Function): KeyMapping[] | undefined {
    return this.mappings.get(cls);
  }
}

export default MappingRegistry.getInstance();
