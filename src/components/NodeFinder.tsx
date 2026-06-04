import { type NodeDefinition } from "@/lib/NodeRegistry";
import * as Definitons from "@/lib/NodeSchemas";
import { Plus } from "lucide-react";
import { useState } from "react";

type NodeFinderProps = {
  onSelect: (selectedDef: NodeDefinition) => void;
};

const NodeFinder = ({ onSelect }: NodeFinderProps) => {
  const definitions = Object.values(Definitons);

  const [_, setSelected] = useState<NodeDefinition | null>(null);
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  return (
    <>
      <button
        className="absolute top-4 right-4 size-8 rounded-lg flex items-center justify-center bg-emerald-700"
        onClick={() => setIsMenuShowing((prev) => !prev)}
      >
        <Plus />
      </button>
      {isMenuShowing && (
        <div className="node-finder">
          <div className="node-finder_inner">
            {definitions.map((def) => (
              <div
                key={def.type}
                className="hover:bg-sky-900/90 rounded-md px-2 py-0.5"
                onClick={() => {
                  onSelect(def);
                  setSelected(def);
                  setIsMenuShowing(false);
                }}
              >
                <p className="ml-1 text-nowrap">{def.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NodeFinder;
