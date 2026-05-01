import React from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { Database } from "lucide-react";

type DatabaseNodeData = {
  label?: string;
};

export default function DatabaseNode({ data }: NodeProps<DatabaseNodeData>) {
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

        {/* Icon Container with the pinkish hue from the image */}
        <div className="relative mb-1 flex items-center justify-center p-1 rounded bg-red-50/30">
          <Database
            size={28}
            strokeWidth={1.5}
            className="text-red-400 opacity-80"
          />
          {/* Small inner block detail to mimic the visual in image_767262.png */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-3 bg-red-200/50 rounded-sm mt-1" />
          </div>
        </div>

        <div className="text-[#666] italic text-[6px] font-medium select-none">
          {data.label || "S3"}
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
