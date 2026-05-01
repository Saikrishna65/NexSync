export type NodeType = "api" | "db" | "cache" | "queue";

export interface ArchitectureNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  config: {
    latency?: number;
    failureRate?: number;
    capacity?: number;
  };
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
}

export interface WorkspaceState {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}
