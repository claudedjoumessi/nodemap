import type { Port, TNode } from "./types";

export type NodeCallback = (variable: number) => number;

export type NodeDefinition = {
  type: TNode['category'];
  name: string;
  inputs: Port['name'][];
  outputs: Port['name'][];
  data?: Record<string, number>;
  compute: (parameters: NodeCallback[]) => NodeCallback;
};

const registry: Record<NodeDefinition["name"], NodeDefinition> = {};

export const registerDefinition = (def: NodeDefinition) => {
  registry[def.name] = def;
  return def;
};
