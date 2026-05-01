import React from "react";
import Link from "next/link";
import { Home, Folder, BarChart2, Settings } from "lucide-react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#0B0F19] text-white">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between border-r border-white/10 p-6">
        <div>
          <h1 className="text-xl font-semibold mb-8">SysSim ⚡</h1>

          <nav className="space-y-2">
            <SidebarItem
              icon={<Home size={18} />}
              label="Dashboard"
              href="/dashboard"
            />
            <SidebarItem
              icon={<Folder size={18} />}
              label="Workspaces"
              href="/workspaces"
            />
            <SidebarItem
              icon={<BarChart2 size={18} />}
              label="Analytics"
              href="/analytics"
            />
            <SidebarItem
              icon={<Settings size={18} />}
              label="Settings"
              href="/dashboard/settings"
            />
          </nav>
        </div>

        <div className="text-sm text-gray-400">
          <p>Logged in as</p>
          <p className="text-white font-medium">User</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>

          <Link href="/workspaces/1">
            <button className="bg-white cursor-pointer text-black px-4 py-2 rounded-lg text-sm font-medium">
              New Workspace
            </button>
          </Link>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC] text-black">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
};
