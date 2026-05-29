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
};

type PendingEdge = {
  sourceX: number;
  sourceY: number;
  currentX: number;
  currentY: number;
};

type Edge = {
  sourceX: number;
  sourceY: number;
  toX: number;
  toY: number;
}

export type { TNode, Port, Connection, Edge, PendingEdge };
