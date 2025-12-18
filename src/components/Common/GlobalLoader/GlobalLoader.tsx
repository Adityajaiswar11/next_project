"use client";
import { useLoader } from "@/context/LoaderContext";

export const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white p-6 space-y-6">
      <div className="h-12 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
          />
        ))}
      </div>
    </div>
  );
};
