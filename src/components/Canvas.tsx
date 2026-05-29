import React, { useState } from "react";
import Node from "./Node";
import type { PendingEdge, Connection, TNode } from "../lib/types";
import BezierLayer from "./BezierLayer";

const Canvas = () => {
  const nodesData: TNode[] = [
    {
      id: "e",
      name: "Increment",
      position: { x: 120, y: 240 },
      inputs: [{ id: "I1", name: "X" }],
      outputs: [{ id: "O1", name: "Result" }],
    },
    {
      id: "m",
      name: "Add",
      position: { x: 450, y: 500 },
      inputs: [
        { id: "I1", name: "X" },
        { id: "I2", name: "Y" },
      ],
      outputs: [{ id: "O1", name: "Result" }],
    },
  ];

  const [nodes, setNodes] = useState(nodesData);
  const [nodeDragging, setNodeDragging] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingEdge, setPendingEdge] = useState<PendingEdge | null>(null);

  // Node Dragging Logic
  const handleMouseUp = () => {
    setNodeDragging(null);
    setPendingEdge(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (pendingEdge) {
      setPendingEdge({
        ...pendingEdge,
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
    if (!nodeDragging) return;
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
  // let canvas know about the moment we click on a noodle (ok)
  // get its (x, y) of output and setup an pending connection (ok)
  // if we leave upon an input, finalize by setting a real connection
  // otherwise cancel, and reset pending connection.
  // also we can't connect from an input to an output. It is Out -> In.
  const handleConnection = (
    id: string,
    portId: string,
    portType: "input" | "output",
    ref: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (!ref.current) return;
    if (portType === "input") return;

    const rect = ref.current.getBoundingClientRect();
    const portX = rect.left + rect.width / 2;
    const portY = rect.top + rect.height / 2;

    setPendingEdge({
      sourceX: portX,
      sourceY: portY,
      currentX: portX,
      currentY: portY,
    });
  };

  return (
    <div
      id="canvasScreen"
      className="canvas-screen"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <BezierLayer pendingEdge={pendingEdge} />
      {nodes.map((n) => (
        <Node
          key={n.id}
          node={n}
          onDragStart={onDragStart}
          onPortClick={handleConnection}
        />
      ))}
    </div>
  );
};

export default Canvas;
