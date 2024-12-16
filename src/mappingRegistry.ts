import { KeyMapping } from './decorators/JsonProperty';


class MappingRegistry {
  private static instance: MappingRegistry;
  private mappings: Map<Function, KeyMapping[]> = new Map();

  private constructor() {}

  static getInstance(): MappingRegistry {
    if (!MappingRegistry.instance) {
      MappingRegistry.instance = new MappingRegistry();
    }
    return MappingRegistry.instance;
  }

  registerMapping(cls: Function, mappings: KeyMapping[]) {
    this.mappings.set(cls, mappings);
  }

  getMappings(cls: Function): KeyMapping[] | undefined {
    return this.mappings.get(cls);
  }
}

export default MappingRegistry.getInstance();
