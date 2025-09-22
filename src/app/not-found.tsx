'use client';

import Link from 'next/link';

export default function NotFound() {
    const back = () => {
        window.history.back();
    }


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Pagina Niet Gevonden</h2>
          <p className="text-gray-600 max-w-md">
            Sorry, wij konden de pagina die u zoekt niet vinden. Deze is mogelijk verplaatst, verwijderd, of u heeft een verkeerde URL ingevoerd.
          </p>
          <div className="flex gap-4 mt-4">
            <Link 
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Ga Naar Home
            </Link>
            <button 
              onClick={back}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Ga Terug
            </button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-gray-500 text-sm">fixUphone - Repareer uw telefoon</p>
      </footer>
    </div>
  );
}
