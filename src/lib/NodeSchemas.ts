import { registerDefinition } from "./NodeRegistry";

export const value = registerDefinition({
  type: "value",
  name: "Value",
  inputs: [],
  outputs: ["Value"],
  data: { value: 3 },
  compute() {
    return () => this.data?.value ?? 0;
  },
});

// Trigonometric
export const sine = registerDefinition({
  type: "default",
  name: "Sine",
  inputs: ["Angle"],
  outputs: ["Sine"],
  compute(inputs) {
    return (x) => Math.sin(inputs[0]?.(x) ?? 0);
  },
});

export const cosine = registerDefinition({
  type: "default",
  name: "Cosine",
  inputs: ["Angle"],
  outputs: ["Cosine"],
  compute(inputs) {
    return (x) => Math.cos(inputs[0]?.(x) ?? 0);
  },
});

export const tangent = registerDefinition({
  type: "default",
  name: "Tangent",
  inputs: ["Angle"],
  outputs: ["Tangent"],
  compute(inputs) {
    return (x) => Math.tan(inputs[0]?.(x) ?? 0);
  },
});

// Inverse trigonometry
export const arcsine = registerDefinition({
  type: "default",
  name: "ArcSine",
  inputs: ["Value"],
  outputs: ["Angle"],
  compute(inputs) {
    // return (x) => Math.asin(Math.max(-1, Math.min(1, inputs[0]?.(x) ?? 0)));
    return (x) => Math.asin(inputs[0]?.(x) ?? 0);
  },
});

export const arccosine = registerDefinition({
  type: "default",
  name: "ArcCosine",
  inputs: ["Value"],
  outputs: ["Angle"],
  compute(inputs) {
    return (x) => Math.acos(Math.max(-1, Math.min(1, inputs[0]?.(x) ?? 0)));
  },
});

export const arctangent = registerDefinition({
  type: "default",
  name: "ArcTangent",
  inputs: ["Value"],
  outputs: ["Angle"],
  compute(inputs) {
    return (x) => Math.atan(inputs[0]?.(x) ?? 0);
  },
});

// Unit conversions
export const degreesToRadians = registerDefinition({
  type: "default",
  name: "DegToRad",
  inputs: ["Degrees"],
  outputs: ["Radians"],
  compute(inputs) {
    return (x) => ((inputs[0]?.(x) ?? 0) * Math.PI) / 180;
  },
});

export const radiansToDegrees = registerDefinition({
  type: "default",
  name: "RadToDeg",
  inputs: ["Radians"],
  outputs: ["Degrees"],
  compute(inputs) {
    return (x) => ((inputs[0]?.(x) ?? 0) * 180) / Math.PI;
  },
});

// Arithmetic
export const add = registerDefinition({
  type: "default",
  name: "Add",
  inputs: ["Value 1", "Value 2"],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => (inputs[0]?.(x) ?? 0) + (inputs[1]?.(x) ?? 0);
  },
});

export const multiply = registerDefinition({
  type: "default",
  name: "Multiply",
  inputs: ["Value 1", "Value 2"],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => (inputs[0]?.(x) ?? 0) * (inputs[1]?.(x) ?? 0);
  },
});

export const subtract = registerDefinition({
  type: "default",
  name: "Subtract",
  inputs: ["Minuend", "Subtrahend"],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => (inputs[0]?.(x) ?? 0) - (inputs[1]?.(x) ?? 0);
  },
});

export const divide = registerDefinition({
  type: "default",
  name: "Divide",
  inputs: ["Dividend", "Divisor"],
  outputs: ["Quotient"],
  compute(inputs) {
    return (x) => {
      const a = inputs[0]?.(x) ?? 0;
      const b = inputs[1]?.(x);
      if (b === undefined) return a;
      return b === 0 ? NaN : a / b;
    };
  },
});

export const power = registerDefinition({
  type: "default",
  name: "Power",
  inputs: ["Base", "Exponent"],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => Math.pow(inputs[0]?.(x) ?? 0, inputs[1]?.(x) ?? 2);
  },
});

// Root / magnitude
export const sqrt = registerDefinition({
  type: "default",
  name: "Square Root",
  inputs: ["Value"],
  outputs: ["Root"],
  compute(inputs) {
    return (x) => Math.sqrt(Math.max(0, inputs[0]?.(x) ?? 0));
  },
});

export const abs = registerDefinition({
  type: "default",
  name: "Absolute",
  inputs: ["Value"],
  outputs: ["Absolute"],
  compute(inputs) {
    return (x) => Math.abs(inputs[0]?.(x) ?? 0);
  },
});

// Rounding
export const floor = registerDefinition({
  type: "default",
  name: "Floor",
  inputs: ["Value"],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => Math.floor(inputs[0]?.(x) ?? 0);
  },
});

export const ceil = registerDefinition({
  type: "default",
  name: "Ceiling",
  inputs: ["Value"],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => Math.ceil(inputs[0]?.(x) ?? 0);
  },
});

// Clamp / min / max
export const clamp = registerDefinition({
  type: "default",
  name: "Clamp",
  inputs: ["Value", "Min", "Max"],
  outputs: ["Clamped"],
  compute(inputs) {
    return (x) => {
      const v = inputs[0]?.(x) ?? 0;
      const lo = inputs[1]?.(x);
      const hi = inputs[2]?.(x);
      if (lo === undefined && hi === undefined) return v;
      if (lo !== undefined && v < lo) return lo;
      if (hi !== undefined && v > hi) return hi;
      return v;
    };
  },
});

export const minimum = registerDefinition({
  type: "default",
  name: "Minimum",
  inputs: ["Value A", "Value B"],
  outputs: ["Min"],
  compute(inputs) {
    return (x) => Math.min(inputs[0]?.(x) ?? 0, inputs[1]?.(x) ?? 0);
  },
});

export const maximum = registerDefinition({
  type: "default",
  name: "Maximum",
  inputs: ["Value A", "Value B"],
  outputs: ["Max"],
  compute(inputs) {
    return (x) => Math.max(inputs[0]?.(x) ?? 0, inputs[1]?.(x) ?? 0);
  },
});

// Modular & reciprocals
export const modulo = registerDefinition({
  type: "default",
  name: "Modulo",
  inputs: ["Dividend", "Divisor"],
  outputs: ["Remainder"],
  compute(inputs) {
    return (x) => {
      const a = inputs[0]?.(x) ?? 0;
      const b = inputs[1]?.(x) ?? 1;
      if (b === 0) return NaN;
      return ((a % b) + b) % b;
    };
  },
});

export const reciprocal = registerDefinition({
  type: "default",
  name: "Reciprocal",
  inputs: ["Value"],
  outputs: ["Reciprocal"],
  compute(inputs) {
    return (x) => {
      const v = inputs[0]?.(x) ?? 0;
      return v === 0 ? NaN : 1 / v;
    };
  },
});

export const sign = registerDefinition({
  type: "default",
  name: "Sign",
  inputs: ["Value"],
  outputs: ["Sign"],
  compute(inputs) {
    return (x) => Math.sign(inputs[0]?.(x) ?? 0);
  },
});

// Exponentials & logs
export const naturalLog = registerDefinition({
  type: "default",
  name: "Natural Log",
  inputs: ["Value"],
  outputs: ["Log"],
  compute(inputs) {
    return (x) => Math.log(inputs[0]?.(x) ?? 1);
  },
});

export const logBase = registerDefinition({
  type: "default",
  name: "Logarithm",
  inputs: ["Value", "Base"],
  outputs: ["Log"],
  compute(inputs) {
    return (x) => {
      const v = inputs[0]?.(x) ?? 1;
      const b = inputs[1]?.(x);
      if (b === undefined || b === Math.E) return Math.log(v);
      return Math.log(v) / Math.log(b);
    };
  },
});

export const exponential = registerDefinition({
  type: "default",
  name: "Exponential",
  inputs: ["Exponent"],
  outputs: ["Result"],
  compute(inputs) {
    return (x) => Math.exp(inputs[0]?.(x) ?? 0);
  },
});
