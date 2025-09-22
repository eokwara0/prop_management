"use client";
import { useRouter } from "next/navigation";

 // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    // global-error must include html and body tags
    <html>
      <body className="h-svh bg-gradient-to-br from-dialog-color to-dialog-color">
        <div className="flex flex-col gap-3 justify-center items-center h-svh bg-gradient-to-br from-dialog-color to-dialog-color">
          <h2 className="text-3xl">Something went wrong!</h2>
          <p>{error?.message}</p>
          <button
            className="cursor-pointer bg-button py-2 px-5 rounded-sm shadow-md shadow-black  inset-shadow-2xs inset-shadow-accent/50 text-xs"
            onClick={() => {
              router.push('/login')
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
