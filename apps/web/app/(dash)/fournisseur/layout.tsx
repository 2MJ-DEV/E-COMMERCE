export default function FournisseurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mx-auto w-full max-w-7xl px-6 py-6">{children}</section>;
}
