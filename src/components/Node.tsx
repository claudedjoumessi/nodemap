import { ChevronDown } from "lucide-react";
import type { TNode } from "../lib/types";
import type React from "react";
import { useRef, useState } from "react";

type NodeProps = {
  node: TNode;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onPortClick: (
    id: string,
    portId: string,
    portType: "input" | "output",
    ref: React.RefObject<HTMLDivElement | null>,
  ) => void;
};

const Node = ({ node, onDragStart, onPortClick }: NodeProps) => {
  const [grabbing, setGrabbing] = useState(false);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    setGrabbing(true);
    onDragStart(node.id, e);
  };

  return (
    <div className="node" style={{ top: node.position.y, left: node.position.x }}>
      <div
        className={`node-header ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={(e) => handleHeaderMouseDown(e)}
        onMouseUp={() => setGrabbing(false)}
      >
        <ChevronDown size={22} />
        <div className="node-name">{node.name}</div>
      </div>
      <div className="node-body">
        {/* Ouput Ports */}
        <div className="node-ports node-outputs">
          {node.outputs.map((out) => (
            <div className="port" key={out.id}>
              <div className="port-name">{out.name}</div>
              <div
                ref={outputRef}
                className="port-noodle"
                onMouseDown={() => onPortClick(node.id, out.id, "output", outputRef)}
              ></div>
            </div>
          ))}
        </div>
        {/* Input Ports */}
        <div className="node-ports node-inputs">
          {node.inputs.map((inp) => (
            <div className="port" key={inp.id}>
              <div className="port-name">{inp.name}</div>
              <div
                ref={inputRef}
                className="port-noodle"
                onMouseDown={() => onPortClick(node.id, inp.id, "input", inputRef)}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Node;
