// nodes/StorageNode.tsx

"use client";

export default function StorageNode({ data }: any) {
  return (
    <div className="relative h-[130px] w-[130px]">
      {/* back */}
      <div className="absolute left-1 top-1 h-[120px] w-[120px] rounded-2xl border-2 border-zinc-400 bg-zinc-200" />

      {/* front */}
      <div className="relative flex h-[120px] w-[120px] flex-col items-center rounded-2xl border-2 border-zinc-500 bg-[#f8f8f6] p-4 shadow-sm">
        {/* icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-zinc-400 bg-white text-3xl">
          {data?.icon || "📦"}
        </div>

        {/* tech */}
        <div className="mt-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          {data?.techName || "S3"}
        </div>

        {/* label */}
        <div className="mt-1 text-xs text-zinc-700">
          {data?.label || "Storage"}
        </div>
      </div>
    </div>
  );
}
