import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TNode } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setActive(nodes: TNode[], nodeId: string) {
  const node = nodes.find(n => n.id === nodeId)
  node 
}
