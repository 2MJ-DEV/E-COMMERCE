import PublicNavbar from "../../components/shared/public-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PublicNavbar />
      <main>{children}</main>
    </div>
  );
}
