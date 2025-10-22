"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="nl">
      <body>
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="flex flex-col items-center text-center gap-8">
              <h1 className="text-6xl font-bold text-red-600">Oeps!</h1>
              <h2 className="text-2xl font-semibold text-gray-700">Er is een kritieke fout opgetreden</h2>
              <p className="text-gray-600 max-w-md">
                Sorry, er is een onverwachte fout opgetreden. Probeer de pagina te herladen of keer terug naar de homepagina.
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Probeer Opnieuw
                </button>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Ga Naar Home
                </button>
              </div>
            </div>
          </main>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            <p className="text-gray-500 text-sm">fixUphone - Repareer uw telefoon</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
