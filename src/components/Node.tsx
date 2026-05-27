import { ChevronDown } from "lucide-react";
import type { TNode } from "../lib/types";
import type React from "react";
import { useState } from "react";

type NodeProps = {
  node: TNode;
  onDragStart: (id: string, e: React.MouseEvent) => void;
};

const Node = ({ node, onDragStart }: NodeProps) => {
  
  const [grabbing, setGrabbing] = useState(false);
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    setGrabbing(true);
    onDragStart(node.id, e);
  };

  return (
    <div
      className="node"
      style={{ top: node.position.y, left: node.position.x }}
    >
      <div
        className={`node-header ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={(e) => handleHeaderMouseDown(e)}
        onMouseUp={() => setGrabbing(false)}
      >
        <ChevronDown size={22} />
        <div className="node-name">{node.name}</div>
      </div>
      <div className="node-body">
        <div className="node-ports node-outputs">
          {node.outputs.map((out) => (
            <div className="port" key={out.id}>
              <div className="port-name">{out.name}</div>
              <div className="port-noodle"></div>
            </div>
          ))}
        </div>
        <div className="node-ports node-inputs">
          {node.inputs.map((inp) => (
            <div className="port" key={inp.id}>
              <div className="port-name">{inp.name}</div>
              <div className="port-noodle"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Node;
