export default function AboutLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-full bg-olive-core/20" />
        <p className="font-body text-sm tracking-wider text-olive-muted">Loading about...</p>
      </div>
    </div>
  );
}
