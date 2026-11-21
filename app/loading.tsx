export default function Loading() {
  return (
    <div className="bg-[#FAFAFA] text-[#1A1A2E] min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-32 h-10 bg-gray-200 rounded-full" />
        <div className="flex w-full max-w-md gap-4">
          <div className="flex-1 h-4 bg-gray-200 rounded" />
          <div className="flex-1 h-4 bg-gray-200 rounded" />
          <div className="flex-1 h-4 bg-gray-200 rounded" />
        </div>
        <div className="w-64 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
