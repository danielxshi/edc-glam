// src/app/account/activate/[...slug]/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Something went wrong while activating your account.</h1>
      <p>Digest: {error.digest ?? "—"}</p>
      <button onClick={reset} style={{ marginTop: 12, padding: "8px 12px", border: "1px solid #000" }}>
        Try again
      </button>
    </div>
  );
}
