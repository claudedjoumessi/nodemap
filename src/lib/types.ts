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

export type { TNode, Port };
