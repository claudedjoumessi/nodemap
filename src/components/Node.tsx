import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { TNode } from "../lib/types";
import type React from "react";
import { useRef, useState } from "react";
import { useNodeContext } from "@/context/NodeContext";
import { cn } from "@/lib/utils";

export type NodeProps = {
  node: TNode;
  active?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  registerPort: (nodeId: string, portId: string, el: HTMLDivElement | null) => void;
  onDragStart: (nodeId: string, e: React.MouseEvent) => void;
  onOutputPortMouseDown: (nodeId: string, portId: string) => void;
  onInputMouseUp: (nodeId: string, portId: string) => void;
  onInputMouseDown: (nodeId: string, portId: string) => void;
  onMouseDown?: (nodeId: string) => void;
};

const Node = ({
  node,
  active,
  className,
  registerPort,
  onDragStart,
  onOutputPortMouseDown,
  onInputMouseUp,
  onInputMouseDown,
  onMouseDown,
}: NodeProps) => {
  const [grabbing, setGrabbing] = useState(false);

  const { updateNodeData } = useNodeContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    setGrabbing(true);
    onDragStart(node.id, e);
  };

  return (
    <div
      className={cn(`node ${active && "outline outline-white/40"} transition-colors`, className)}
      style={{ top: node.position.y, left: node.position.x }}
      onMouseDown={() => onMouseDown?.(node.id)}
    >
      <div
        className={`node-header ${node.category === "io" && " bg-neutral-900"}
                    ${node.category === "value" && " bg-pink-900"}
                    ${node.category === "default" && " bg-emerald-900"}
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
        {node.outputs.length !== 0 && (
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
        )}
        {node.data?.value !== undefined &&
          (() => {
            const updateInput = (value: string) => {
              updateNodeData(node.id, { value: parseFloat(value ?? 0) });
            };

            return (
              <div className="value-input flex bg-neutral-700 rounded-md">
                <button
                  className="rounded-l-md hover:bg-neutral-600"
                  type="button"
                  onClick={() => {
                    inputRef.current?.stepDown();
                    updateInput((inputRef.current as HTMLInputElement).value);
                  }}
                >
                  <ChevronLeft />
                </button>
                <input
                  ref={inputRef}
                  type="number"
                  className="outline-none w-full px-1.5 text-center"
                  value={node.data.value}
                  onChange={(e) => {
                    updateInput(isNaN(parseFloat(e.target.value)) ? "0" : e.target.value);
                  }}
                />
                <button
                  className="rounded-r-md hover:bg-neutral-600"
                  type="button"
                  onClick={() => {
                    inputRef.current?.stepUp();
                    updateInput((inputRef.current as HTMLInputElement).value);
                  }}
                >
                  <ChevronRight />
                </button>
              </div>
            );
          })()}
        {/* Input Ports */}
        {node.inputs.length !== 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Node;
