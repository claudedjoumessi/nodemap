import type { PendingEdge } from "../lib/types";

type BezierLayerProps = {
  pendingEdge: PendingEdge | null;
};

// Formula
// M x0 y0 C x1 y1, x2 y2, x3 y3
// (x1, y1) = (x0 + offset, y0)
// (x2, y2) = (x3 - offset, y3)
// offset = clamp(|x3 - x0| * 0.5, minOff, maxOff)

const BezierLayer = ({ pendingEdge }: BezierLayerProps) => {
  const offset = (x1: number, x2: number) => {
    return Math.abs(x1 - x2) * 0.5
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bezier Layer for connections"
      style={{ width: "100%", height: "100%" }}
    >
      {pendingEdge && (
        <path
          d={`M ${pendingEdge.sourceX} ${pendingEdge.sourceY} 
              C ${pendingEdge.sourceX + offset(pendingEdge.currentX, pendingEdge.sourceX)} ${pendingEdge.sourceY},
                ${pendingEdge.currentX - offset(pendingEdge.currentX, pendingEdge.sourceX)} ${pendingEdge.currentY},
                ${pendingEdge.currentX} ${pendingEdge.currentY}`}
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default BezierLayer;
