import type { Connection, TNode } from "@/lib/types";

type NodeCallback = (variable: number) => number;

const getNodeParents = (destNodeId: string, nodes: TNode[], connections: Connection[]) => {
  const sources = [];
  const parents = [];

  const parConns = connections.filter((c) => c.targetNodeId === destNodeId);

  for (const pC of parConns) {
    sources.push(pC.sourceNodeId);
  }

  for (const source of sources) {
    const nS = nodes.find((n) => n.id === source);
    if (!nS) continue;
    parents.push(nS);
  }

  return parents;
};

// Evaluate Pipeline
export const useEvaluate = (
  nodes: TNode[],
  connections: Connection[],
) => {
  const evaluate = (nodeId: string): NodeCallback => {
    const node = nodes.find((n) => n.id === nodeId)!;
    const parents = getNodeParents(nodeId, nodes, connections);
    const inputs = parents.map((p) => evaluate(p.id));

    switch (node.type) {
      case "input":
        return (x) => x;
      case "sine":
        return (x) => Math.sin(inputs[0]?.(x) ?? x);
      case "multiply":
        return (x) => inputs[0](x) * inputs[1](x);
      case "add":
        return (x) => (inputs[0]?.(x) ?? 0) + (inputs[1]?.(x) ?? 0);
      case "output":
        return (x) => inputs[0]?.(x) ?? 0;
      default:
        return (_x) => 0;
    }
  };

  return { evaluate }
};
