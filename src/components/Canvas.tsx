import React, { useRef, useState } from "react";
import Node from "./Node";
import type { PendingConnection, Connection, TNode } from "../lib/types";
import BezierLayer from "./BezierLayer";
import { nanoid } from "nanoid";
import { Play } from "lucide-react";

const Canvas = () => {
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
      position: { x: 880, y: 320 },
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
  const [nodes, setNodes] = useState(nodesData);
  const [nodeDragging, setNodeDragging] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingConnection, setPendingConnection] = useState<PendingConnection | null>(null);
  const [disconnecting, setDisconnecting] = useState<Omit<Connection, "id"> | null>(null);

  // Port Global Registry
  const portRefs = useRef<Record<string, HTMLDivElement>>({});

  const registerPort = (nodeId: string, portId: string, el: HTMLDivElement | null) => {
    if (el) portRefs.current[`${nodeId}.${portId}`] = el;
  };

  const getPortPos = (nodeId: string, portId: string) => {
    const portEl = portRefs.current[`${nodeId}.${portId}`];
    const portRect = portEl.getBoundingClientRect();

    return {
      portX: portRect.left + portRect.width / 2,
      portY: portRect.top + portRect.height / 2,
    };
  };

  // Node Dragging Logic
  const handleMouseUp = () => {
    setNodeDragging(null);
    setPendingConnection(null);
    setDisconnecting(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (pendingConnection) {
      setPendingConnection({
        ...pendingConnection,
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
    if (disconnecting) {
      setPendingConnection({
        sourceNodeId: disconnecting.sourceNodeId,
        sourcePortId: disconnecting.sourcePortId,
        sourceX: getPortPos(disconnecting.sourceNodeId, disconnecting.sourcePortId).portX,
        sourceY: getPortPos(disconnecting.sourceNodeId, disconnecting.sourcePortId).portY,
        currentX: e.clientX,
        currentY: e.clientY,
      });

      setConnections(
        (prev) => disconnectAt(disconnecting.targetNodeId, disconnecting.targetPortId) ?? prev,
      );
    }
    if (nodeDragging) {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeDragging.id
            ? {
                ...n,
                position: {
                  x: e.clientX - nodeDragging.offsetX,
                  y: e.clientY - nodeDragging.offsetY,
                },
              }
            : n,
        ),
      );
    }
  };

  const onDragStart = (id: string, e: React.MouseEvent) => {
    const node = nodes.find((n) => n.id === id)!;
    setNodeDragging({
      id,
      offsetX: e.clientX - node.position.x,
      offsetY: e.clientY - node.position.y,
    });
  };

  // Connection Logic
  const handlePendingConnection = (nodeId: string, portId: string) => {
    const { portX, portY } = getPortPos(nodeId, portId);

    setPendingConnection({
      sourceNodeId: nodeId,
      sourcePortId: portId,
      sourceX: portX,
      sourceY: portY,
      currentX: portX,
      currentY: portY,
    });
  };

  const handleConnection = (nodeId: string, portId: string) => {
    if (!pendingConnection) return;
    if (nodeId === pendingConnection.sourceNodeId) return;
    if (checkConnection(nodeId, portId)) return;

    setConnections((prev) => [
      ...prev,
      {
        id: `${nanoid()}`,
        sourceNodeId: pendingConnection.sourceNodeId,
        sourcePortId: pendingConnection.sourcePortId,
        targetNodeId: nodeId,
        targetPortId: portId,
      },
    ]);
  };

  const handleDisconnect = (nodeId: string, portId: string) => {
    const conn = checkConnection(nodeId, portId);
    if (!conn) return;
    setDisconnecting({
      sourceNodeId: conn.sourceNodeId,
      sourcePortId: conn.sourcePortId,
      targetNodeId: nodeId,
      targetPortId: portId,
    });
  };

  // Checks if a connection is etablished at input nodeId.portId
  const checkConnection = (destNodeId: string, destPortId: string) => {
    return (
      connections.find(
        (c) => c.targetNodeId === destNodeId && c.targetPortId === destPortId,
      ) ?? null
    );
  };

  const disconnectAt = (destNodeId: string, destPortId: string) => {
    const delConn = checkConnection(destNodeId, destPortId);
    if (!delConn) return;
    return connections.filter((c) => c !== delConn);
  };

  const getNodeParents = (destNodeId: string) => {
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

  type NodeCallback = (variable: number) => number;

  // Evaluate Pipeline
  const evaluate = (nodeId: string): NodeCallback => {
    const node = nodes.find((n) => n.id === nodeId)!;
    const parents = getNodeParents(nodeId);
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

  return (
    <div
      id="canvasScreen"
      className="canvas-screen"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <BezierLayer
        pendingEdge={pendingConnection}
        connections={connections}
        portRefs={portRefs}
      />
      {nodes.map((n) => (
        <Node
          key={n.id}
          node={n}
          registerPort={registerPort}
          onDragStart={onDragStart}
          onOutputPortMouseDown={handlePendingConnection}
          onInputMouseUp={handleConnection}
          onInputMouseDown={handleDisconnect}
        />
      ))}
      <button
        type="button"
        onClick={() => console.log(evaluate("out")(30 * (Math.PI / 180)))}
        className="absolute top-4 right-4 bg-emerald-800 p-2 rounded-xl active:bg-emerald-900 active:scale-95 cursor-pointer"
      >
        <Play />
      </button>
    </div>
  );
};

export default Canvas;
