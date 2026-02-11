import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileLogoutButton } from "@/components/profile-logout-button";

export default function ClientProfilPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Mon profil client</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Espace personnel du client avec image de profil par defaut.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Image
            src="/profil.png"
            alt="Photo de profil par defaut"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full border object-cover"
          />
          <div>
            <p className="text-sm text-muted-foreground">
              Cette image est appliquee comme avatar par defaut.
            </p>
            <div className="mt-3">
              <ProfileLogoutButton />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
