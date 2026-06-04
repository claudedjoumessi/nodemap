import { registerDefinition } from "./NodeRegistry";

export const add = registerDefinition({
  type: "add",
  name: "Add",
  inputs: [
    { name: "V1", defaultValue: 0 },
    { name: "V2" },
  ],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => (inputs[0]?.(x) ?? 0) + (inputs[1]?.(x) ?? 0);
  },
});
