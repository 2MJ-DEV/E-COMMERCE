import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur">
        <p className="text-sm font-sans uppercase tracking-[0.3em] text-white/60">
          Erreur 404
        </p>
        <h1 className="mt-4 text-4xl font-sans uppercase tracking-tight md:text-5xl">
          Page introuvable
        </h1>
        <p className="mt-4 text-sm font-sans text-white/70 md:text-base">
          La page que vous cherchez n&apos;existe plus ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-xs font-sans uppercase tracking-[0.2em] text-neutral-900 transition hover:-translate-y-0.5"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2 text-xs font-sans uppercase tracking-[0.2em] text-white transition hover:border-white"
          >
            Voir la marketplace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
