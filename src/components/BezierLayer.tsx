import type { Connection, PendingConnection } from "../lib/types";

type BezierLayerProps = {
  pendingEdge: PendingConnection | null;
  connections: Connection[];
  getPortPos: (nodeId: string, portId: string) => { portX: number; portY: number };
};

// Formula
// M x0 y0 C x1 y1, x2 y2, x3 y3
// (x1, y1) = (x0 + offset, y0)
// (x2, y2) = (x3 - offset, y3)
// offset = clamp(|x3 - x0| * 0.5, minOff, maxOff)

const BezierLayer = ({ pendingEdge, connections, getPortPos }: BezierLayerProps) => {
  const offset = (x1: number, x2: number, tension: number = 0.3) => {
    return Math.abs(x1 - x2) * tension;
  };

  const getConnectionPoints = (connection: Connection) => {
    const { portX: x1, portY: y1 } = getPortPos(
      connection.sourceNodeId,
      connection.sourcePortId,
    );
    const { portX: x2, portY: y2 } = getPortPos(
      connection.targetNodeId,
      connection.targetPortId,
    );

    return { x1, y1, x2, y2 };
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bezier Layer for connections"
      style={{ width: "100%", height: "100%" }}
    >
      {pendingEdge &&
        (() => {
          const { portX, portY } = getPortPos(
            pendingEdge.sourceNodeId,
            pendingEdge.sourcePortId,
          );
          return (
            <path
              d={`M ${portX} ${portY} 
              C ${portX + offset(pendingEdge.currentX, portX)} ${portY},
                ${pendingEdge.currentX - offset(pendingEdge.currentX, portX)} ${pendingEdge.currentY},
                ${pendingEdge.currentX} ${pendingEdge.currentY}`}
              fill="none"
              className="stroke-white/90"
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })()}

      {connections.map((c) => {
        const { x1, y1, x2, y2 } = getConnectionPoints(c);

        return (
          <path
            key={c.id}
            d={`M ${x1} ${y1} 
              C ${x1 + offset(x2, x1)} ${y1},
                ${x2 - offset(x2, x1)} ${y2},
                ${x2} ${y2}`}
            fill="none"
            className="stroke-emerald-700"
            strokeWidth={3}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export default BezierLayer;
