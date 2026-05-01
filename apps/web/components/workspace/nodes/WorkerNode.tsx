// nodes/WorkerNode.tsx
"use client";

import React from "react";
import { Handle, Position } from "reactflow";
import { Cpu } from "lucide-react";

export default function WorkerNode({ data }: any) {
  return (
    <div className="relative group">
      {/* The "Stacked" effect layer */}
      <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] border bg-gray-100 border-gray-500 rounded-md -z-10" />

      {/* Main Node Card */}
      <div className="worker-node flex items-center bg-white border border-[#333] rounded-[6px] px-2 py-2 w-[100px] h-[45px] shadow-sm">
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-transparent !border-none"
        />

        {/* Icon Container */}
        <div className="flex-shrink-0 flex items-center justify-center p-1 rounded bg-red-50/30">
          <Cpu
            size={20}
            strokeWidth={1.2}
            className="text-red-400 opacity-80"
          />
        </div>

        {/* Label Container: Using flex-grow and ml-2 for balanced spacing */}
        <div className="flex-grow ml-2 text-[#666] italic text-[8px] font-medium select-none leading-tight truncate">
          {data?.label || "Worker"}
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-transparent !border-none"
        />
      </div>
    </div>
  );
}
