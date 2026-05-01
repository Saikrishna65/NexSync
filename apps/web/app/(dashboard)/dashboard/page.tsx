const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Good Morning 👋</h1>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <WorkspaceCard />
        <WorkspaceCard />
        <WorkspaceCard />
      </div>
    </div>
  );
};

export default Page;

const WorkspaceCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition border">
      <h3 className="font-semibold text-lg mb-2">E-commerce System</h3>

      <p className="text-sm text-gray-500 mb-4">
        👥 3 members • 🕒 Updated 2h ago
      </p>

      <button className="text-blue-600 text-sm font-medium">Open →</button>
    </div>
  );
};
