import type { Connection, TNode } from "@/lib/types";
import React, { createContext, useContext, type ReactNode } from "react";

interface INodeContext {
  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  nodes: TNode[];
  setNodes: React.Dispatch<React.SetStateAction<TNode[]>>;
}

const NodeContext = createContext<INodeContext | null>(null);

const NodeProvider = ({ children }: { children: ReactNode }) => {
  const nodesData: TNode[] = [
    {
      id: "in",
      name: "Input",
      position: { x: 100, y: 120 },
      inputs: [],
      outputs: [{ id: "Val", name: "Value" }],
      type: "input",
    },
    {
      id: "out",
      name: "Output",
      position: { x: 480, y: 320 },
      inputs: [{ id: "Out", name: "Output" }],
      outputs: [],
      type: "output",
    },
    {
      id: "a",
      name: "Add",
      position: { x: 100, y: 220 },
      inputs: [
        { id: "A", name: "A" },
        { id: "B", name: "B" },
      ],
      outputs: [{ id: "Out", name: "Sum" }],
      type: "add",
    },
    {
      id: "s",
      name: "Sine",
      position: { x: 100, y: 460 },
      inputs: [{ id: "Angle", name: "Angle" }],
      outputs: [{ id: "Out", name: "Sin" }],
      type: "sine",
    },
  ];

  const [nodes, setNodes] = React.useState(nodesData);
  const [connections, setConnections] = React.useState<Connection[]>([]);

  const contextValue = { nodes, setNodes, connections, setConnections };

  return <NodeContext.Provider value={contextValue}>{children}</NodeContext.Provider>;
};

// Context Hook
const useNodeContext = () => {
  const ctx = useContext(NodeContext);
  if (!ctx) throw new Error("Consider wrapping your component in a <NodeProvider>");
  return ctx;
};

export { NodeProvider, useNodeContext };
