// nodes/QueueNode.tsx
"use client";

import React from "react";
import { Handle, Position } from "reactflow";
import { Layers } from "lucide-react"; // Layers works well for a "Queue" visual

export default function QueueNode({ data }: any) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] border bg-gray-100 border-gray-500 rounded-md -z-10" />

      <div
        className="node db-node"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #333",
          background: "#fff",
          width: "55px",
          height: "65px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: "transparent", border: "none" }}
        />

        {/* Icon Container with the soft red/pink theme from the image */}
        <div className="relative mb-1 flex items-center justify-center p-1 rounded bg-red-50/30">
          <Layers
            size={24}
            strokeWidth={1.5}
            className="text-red-400 opacity-80"
          />
        </div>

        {/* Label styled to match image_767262.png */}
        <div className="text-[#666] italic text-[6px] font-medium select-none text-center leading-tight">
          {data?.label || "Queue"}
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: "transparent", border: "none" }}
        />
      </div>
    </div>
  );
}
