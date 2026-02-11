import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/cart/cart-provider";
import PublicNavbar from "../../components/shared/public-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <PublicNavbar />
        <Navbar />
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}
