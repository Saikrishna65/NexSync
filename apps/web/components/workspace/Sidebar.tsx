"use client";

import React from "react";

// 1. Define the interface for your node items
interface NodeItem {
  type: string;
  label: string;
}

const nodeList: NodeItem[] = [
  { type: "api", label: "API Service" },
  { type: "database", label: "Database" },
  { type: "storage", label: "Storage" },
  { type: "queue", label: "queue" },
  { type: "worker", label: "Worker" },
];

export default function Sidebar() {
  // 2. Type the event as a React DragEvent and nodeType as a string
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      className="sidebar"
      style={{
        width: "200px",
        padding: "15px",
        borderRight: "1px solid #ddd",
        height: "100vh",
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
        Drag Nodes:
      </div>

      {nodeList.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          className="sidebar-item"
          style={{
            padding: "8px 12px",
            border: "1px solid #777",
            borderRadius: "4px",
            marginBottom: "10px",
            cursor: "grab",
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
}
