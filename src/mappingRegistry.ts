import { KeyMapping } from './decorators/JsonProperty';

/**
 * 매핑 레지스트리를 관리하는 클래스
 */
class MappingRegistry {
  private static mappings: Map<Function, KeyMapping[]> = new Map();

  /**
   * 클래스에 대한 매핑 정보를 등록
   * @param cls 클래스 생성자
   * @param mappings 매핑 정보 배열
   */
  static registerMapping(cls: Function, mappings: KeyMapping[]) {
    this.mappings.set(cls, mappings);
  }

  /**
   * 클래스에 대한 매핑 정보를 가져옴
   * @param cls 클래스 생성자
   * @returns 매핑 정보 배열
   */
  static getMappings(cls: Function): KeyMapping[] | undefined {
    return this.mappings.get(cls);
  }
}

export default MappingRegistry;
