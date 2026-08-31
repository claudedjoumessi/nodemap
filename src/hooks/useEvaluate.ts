import type { Connection, TNode } from "@/lib/types";
import { useCallback } from "react";

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
export const useEvaluate = (nodes: TNode[], connections: Connection[]) => {
  const evaluate = (nodeId: string): NodeCallback => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) throw new Error("Couldn't read node at id: " + nodeId);
    const parents = getNodeParents(nodeId, nodes, connections);
    const inputs = parents.map((p) => evaluate(p.id));
    // console.log("Reeval...")
    return node.compute(inputs);
  // }, [getNodeParents()]);
  }

  return { evaluate };
};
