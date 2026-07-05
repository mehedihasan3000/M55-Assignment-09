"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
      <div className="w-full max-w-xl text-center">
        <div className="mb-6 text-7xl">⚠️</div>

        <h1 className="text-4xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-4 text-gray-400">
          An unexpected error occurred while loading this page.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-xl border border-gray-700 px-6 py-3 font-medium transition hover:bg-gray-800"
          >
            Back Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-left">
            <p className="mb-2 font-semibold text-red-400">
              Error Details:
            </p>

            <pre className="overflow-auto text-sm text-red-300">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}