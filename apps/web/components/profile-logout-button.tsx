"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ProfileLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("auth_user");
    window.localStorage.removeItem("auth_username");
    router.push("/");
  };

  return (
    <Button variant="outline" type="button" onClick={handleLogout}>
      Deconnexion
    </Button>
  );
}
