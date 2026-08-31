import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import type { NodeDefinition } from "@/lib/NodeRegistry";
import * as Definitions from "@/lib/NodeSchemas";
import { useRef, useState } from "react";

type CanvasContextualLayerProps = {
  onDefSelect: (def: NodeDefinition) => void;
  onClick?: () => void;
};

export const CanvasContextualLayer = ({
  onDefSelect,
  onClick,
}: CanvasContextualLayerProps) => {
  const definitions = Object.values(Definitions);

  const [searchTerm, setSearchTerm] = useState("");
  const itemsRef = useRef<HTMLDivElement | null>(null);

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className="absolute top-0 left-0 w-full h-full"
        onClick={onClick}
      >
        <div />
      </ContextMenuTrigger>
      <ContextMenuContent className="bg-neutral-900/50 node-finder">
        <div className="w-full py-1 px-1.5">
          <InputGroup>
            <InputGroupInput
              autoFocus
              placeholder="Search..."
              onKeyDown={(e) => e.stopPropagation()}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon>
              <Search size={20} opacity={0.7} />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="node-finder_inner" ref={itemsRef}>
          {definitions.map(
            (def) =>
              def.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
                <ContextMenuItem
                  key={def.name}
                  onSelect={() => {
                    onDefSelect(def);
                    setSearchTerm("");
                  }}
                  className="flex justify-between gap-1 items-center focus:bg-neutral-600/20 text-base font-normal text-neutral-400 focus:text-neutral-100 focus:font-semibold"
                >
                  <p>{def.name}</p>
                  <span className="text-[15px] opacity-85">{def.expression}</span>
                </ContextMenuItem>
              ),
          )}
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
};
