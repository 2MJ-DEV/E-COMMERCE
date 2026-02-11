const items = [
  "-10% sur tout les produits avec le code 2MJ_DEV",
  "-10% sur tout les produits avec le code 2MJ_DEV",
  "-10% sur tout les produits avec le code 2MJ_DEV",
  "-10% sur tout les produits avec le code 2MJ_DEV",
];

export default function PromoMarquee() {
  return (
    <div className="w-full overflow-hidden bg-primary py-1 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 text-xs font-semibold uppercase tracking-[0.1rem]">
        <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
          {items.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-3">
              {item}
              <BoltIcon className="h-4 w-4" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" />
    </svg>
  );
}
