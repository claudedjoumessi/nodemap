import { ChevronDown } from "lucide-react";
import type { TNode } from "../lib/types";
import type React from "react";
import { useState } from "react";

type NodeProps = {
  node: TNode;
  registerPort: (nodeId: string, portId: string, el: HTMLDivElement | null) => void;
  onDragStart: (nodeId: string, e: React.MouseEvent) => void;
  onOutputPortMouseDown: (nodeId: string, portId: string) => void;
  onInputMouseUp: (nodeId: string, portId: string) => void;
  onInputMouseDown: (nodeId: string, portId: string) => void;
};

const Node = ({
  node,
  registerPort,
  onDragStart,
  onOutputPortMouseDown,
  onInputMouseUp,
  onInputMouseDown,
}: NodeProps) => {
  const [grabbing, setGrabbing] = useState(false);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    setGrabbing(true);
    onDragStart(node.id, e);
  };

  return (
    <div className="node" style={{ top: node.position.y, left: node.position.x }}>
      <div
        className={`node-header ${(node.type === "input" || node.type === "output") && "io"} 
                    ${grabbing ? "cursor-grabbing" : "cursor-grab"}
                  `}
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
                ref={(el) => registerPort(node.id, out.id, el)}
                className="port-noodle"
                onMouseDown={() => onOutputPortMouseDown(node.id, out.id)}
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
                ref={(el) => registerPort(node.id, inp.id, el)}
                className="port-noodle"
                onMouseUp={() => onInputMouseUp(node.id, inp.id)}
                onMouseDown={() => onInputMouseDown(node.id, inp.id)}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Node;
