import React, { useRef, useState } from "react";
import Node from "./Node";
import type { PendingConnection, Connection } from "../lib/types";
import BezierLayer from "./BezierLayer";
import { nanoid } from "nanoid";
import { useNodeContext } from "@/context/NodeContext";

const Canvas = () => {
  const [nodeDragging, setNodeDragging] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [pendingConnection, setPendingConnection] = useState<PendingConnection | null>(null);
  const [disconnecting, setDisconnecting] = useState<Omit<Connection, "id"> | null>(null);

  // Accessing Nodes & Connections and Setters from Context
  const { nodes, setNodes, connections, setConnections } = useNodeContext()

  // Port Global Registry
  const portRefs = useRef<Record<string, HTMLDivElement>>({});
  const canvasRef = useRef<HTMLDivElement|null>(null)

  const registerPort = (nodeId: string, portId: string, el: HTMLDivElement | null) => {
    if (el) portRefs.current[`${nodeId}.${portId}`] = el;
  };

  const getPortPos = (nodeId: string, portId: string) => {
    const portEl = portRefs.current[`${nodeId}.${portId}`];
    const portRect = portEl.getBoundingClientRect();

    // if(!canvasRef.current) return
    const canvasRect = (canvasRef.current as HTMLDivElement).getBoundingClientRect()

    return {
      portX: (portRect.left + portRect.width / 2) - canvasRect.left,
      portY: (portRect.top + portRect.height / 2) - canvasRect.top,
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

  return (
    <div
      id="canvasScreen"
      ref={canvasRef}
      className="canvas-screen"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <BezierLayer
        pendingEdge={pendingConnection}
        connections={connections}
        getPortPos={getPortPos}
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
    </div>
  );
};

export default Canvas;
