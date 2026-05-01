"use client";
import Canvas from "@/components/workspace/Canvas";
import Sidebar from "@/components/workspace/Sidebar";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <ReactFlowProvider>
        <Canvas />
      </ReactFlowProvider>
    </div>
  );
}
