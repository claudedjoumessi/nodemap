import type { NodeCallback } from "./NodeRegistry";

type TNode = {
  id: string;
  category: "io" | "value" | "default";
  name: string;
  position: { x: number; y: number };
  inputs: Port[];
  outputs: Port[];
  data?: Record<string, number>;
  compute: (parameters: NodeCallback[]) => NodeCallback;
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
