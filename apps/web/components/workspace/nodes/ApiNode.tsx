// nodes/ApiNode.tsx
"use client";

import React from "react";
import { Handle, Position } from "reactflow";
import { Globe } from "lucide-react"; // Using Globe to represent an API/Web service

export default function ApiNode({ data }: any) {
  return (
    <div className="relative group">
      {/* The "Stacked" effect layer - matching image_767262.png aesthetic */}
      <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] border bg-gray-100 border-gray-600 rounded-md -z-10" />

      {/* Main Node Card */}
      <div
        className="node api-node"
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
        {/* React Flow Handles (Hidden/Transparent) */}
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: "transparent", border: "none" }}
        />

        {/* --- ICON AT TOP --- */}
        <div className="relative mb-1 flex items-center justify-center p-1 rounded bg-red-50/30">
          <Globe
            size={28}
            strokeWidth={1.5}
            className="text-red-400 opacity-80"
          />
        </div>

        {/* --- NAME AT BOTTOM --- */}
        <div className="text-center">
          {/* Main Label: Italic, muted gray, matching image_767262.png */}
          <div className="text-[#666] italic text-[7px] font-medium select-none leading-tight">
            {data?.label || "API"}
          </div>

          {/* Optional Tech Name: Extremely tiny helper text */}
          {data?.techName && (
            <div className="text-[7px] font-bold uppercase tracking-tighter text-zinc-400 mt-0.5 leading-none">
              {data.techName}
            </div>
          )}
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
