
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl animate-pulse p-6">
      <div className="mb-3 h-9 w-64 rounded bg-gray-200" />
      <div className="mb-8 h-4 w-80 rounded bg-gray-200" />

      <div className="space-y-6 rounded-xl border p-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-6 w-48 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
