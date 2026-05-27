type TNode = {
  id: string;
  name: string;
  position: { x: number; y: number };
  inputs: Port[];
  outputs: Port[];
};

type Port = {
  id: string;
  name: string;
};

type Connection = {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  toNodeId: string;
  toPortId: string;
  sourceX: number;
  sourceY: number;
  currentX: number;
  currentY: number;
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
