import type { Port } from "./types";

export type NodeCallback = (variable: number) => number;
export type InputField = { name: string; defaultValue?: number }

export type NodeDefinition = {
  type: string;
  name: string;
  inputs: InputField[]; // <- Now an array of dynamic inputs
  outputs: Port['name'][]; // <- Now an array of dynamic outputs
  compute: (inputs: NodeCallback[]) => NodeCallback;
};

const registry: Record<NodeDefinition["type"], NodeDefinition> = {};

export const getDefinition = (type: NodeDefinition["type"]) => {
  return registry[type];
};

export const registerDefinition = (def: NodeDefinition) => {
  try {
    registry[def.type] = def;
  } catch (e) {
    throw new Error("Couldn't register definition to registry.");
  }
  return def;
};
