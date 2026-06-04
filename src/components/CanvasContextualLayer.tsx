import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import type { NodeDefinition } from "@/lib/NodeRegistry";
import * as Definitions from "@/lib/NodeSchemas";

type CanvasContextualLayerProps = {
  onDefSelect: (def: NodeDefinition) => void;
};

export const CanvasContextualLayer = ({
  onDefSelect: onDefSelect,
}: CanvasContextualLayerProps) => {
  const definitions = Object.values(Definitions);
  return (
    <ContextMenu>
      <ContextMenuTrigger className="absolute top-0 left-0 w-full h-full">
        <div />
      </ContextMenuTrigger>
      <ContextMenuContent className="bg-neutral-900/50 node-finder">
        <div className="node-finder_inner">
          {definitions.map((def) => (
            <ContextMenuItem
              key={def.type}
              onSelect={() => onDefSelect(def)}
              className="focus:bg-neutral-600/20 font-normal text-neutral-400 focus:text-neutral-100 focus:font-semibold"
            >
              <p>{def.name}</p>
            </ContextMenuItem>
          ))}
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
};
