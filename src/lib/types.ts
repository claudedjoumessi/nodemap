type TNode = {
  id: string;
  name: string;
  position: { x: number; y: number };
  inputs: Port[];
  outputs: Port[];
  type: "input" | "output" | "add" | "multiply" | "power" | "sine" | "clamp";
};

type Port = {
  id: string;
  name: string;
};

type Connection = {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
};

type PendingConnection = {
  sourceNodeId: string;
  sourcePortId: string;
  sourceX: number;
  sourceY: number;
  currentX: number;
  currentY: number;
};

export type { TNode, Port, Connection, PendingConnection };
