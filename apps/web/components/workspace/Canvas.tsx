"use client";

import React, { useCallback } from "react";

import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  OnConnect,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";

import "@xyflow/react/dist/base.css";

import ApiNode from "./nodes/ApiNode";
import DatabaseNode from "./nodes/DatabaseNode";
import StorageNode from "./nodes/StorageNode";
import QueueNode from "./nodes/QueueNode";
import WorkerNode from "./nodes/WorkerNode";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

// ✅ FIXED nodeTypes mapping (must match your drag types)
const nodeTypes = {
  api: ApiNode,
  database: DatabaseNode,
  storage: StorageNode,
  queue: QueueNode,
  worker: WorkerNode,
};

function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      let type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      // ✅ normalize type to match nodeTypes keys
      type = type.toLowerCase();

      // ❌ prevent invalid nodes
      if (!(type in nodeTypes)) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: {
          label: type.toUpperCase(),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
