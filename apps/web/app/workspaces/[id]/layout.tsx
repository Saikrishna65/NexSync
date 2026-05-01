import React from "react";
import Link from "next/link";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="h-14 border-b flex items-center justify-between px-6 bg-white">
        <h1 className="font-semibold">Workspace Name</h1>

        <div className="flex gap-4 text-sm">
          <Link href="#">Editor</Link>
          <Link href="#">Members</Link>
          <Link href="#">Activity</Link>
          <Link href="#">Settings</Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default WorkspaceLayout;
