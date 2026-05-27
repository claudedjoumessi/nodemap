import React, { useState } from "react";
import Node from "./Node";
import type { TNode } from "../lib/types";

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
      position: { x: 160, y: 240 },
      inputs: [{ id: "I1", name: "X" }, { id: "I2", name: "Y" }],
      outputs: [{ id: "O1", name: "Result" }],
    },
  ];

  const [nodes, setNodes] = useState(nodesData);
  const [dragging, setDragging] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handleMouseUp = () => {
    setDragging(null);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setNodes((prev) =>
      prev.map((n) =>
        n.id === dragging.id // <- Finding exact dragged node
          ? {
              ...n,
              position: {
                x: e.clientX - dragging.offsetX,
                y: e.clientY - dragging.offsetY,
              }
            }
          : n,
      ),
    );
  };

  const onDragStart = (id: string, e: React.MouseEvent) => {
    const node = nodes.find((n) => n.id === id)!;
    setDragging({
      id,
      offsetX: e.clientX - node.position.x,
      offsetY: e.clientY - node.position.y,
    });
    console.log(node);
  };

  return (
    <div
      className="canvas-screen"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {nodes.map((n) => (
        <Node key={n.id} node={n} onDragStart={onDragStart} />
      ))}
    </div>
  );
};

export default Canvas;
