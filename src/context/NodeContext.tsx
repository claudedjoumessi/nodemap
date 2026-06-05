import type { Connection, TNode } from "@/lib/types";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface INodeContext {
  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  nodes: TNode[];
  setNodes: React.Dispatch<React.SetStateAction<TNode[]>>;
}

const NodeContext = createContext<INodeContext | null>(null);

const NodeProvider = ({ children }: { children: ReactNode }) => {
  const starterNodes: TNode[] = [
    {
      id: "in",
      name: "Input",
      inputs: [],
      outputs: [{ id: "I1", name: "Input" }],
      position: { x: 100, y: 300 },
      compute() {
        return (x) => x;
      },
    },
    {
      id: "out",
      name: "Output",
      inputs: [{ id: "O1", name: "Output" }],
      outputs: [],
      position: { x: 500, y: 300 },
      compute(inputs) {
        return (x) => inputs[0]?.(x) ?? 0;
      },
    },
  ];

  // Setting nodes before DOM first render
  const [nodes, setNodes] = useState<TNode[]>(starterNodes);
  const [connections, setConnections] = useState<Connection[]>([]);

  // Setting connections after DOM first render
  useEffect(() => {
    const starterConnections: Connection[] = [
      {
        id: "in.I1_out.O1",
        sourceNodeId: "in",
        sourcePortId: "I1",
        targetNodeId: "out",
        targetPortId: "O1",
      },
    ];
    setConnections(starterConnections);
  }, []);

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
