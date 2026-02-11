import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileHistory } from "@/components/profile-history";
import { ProfileLogoutButton } from "@/components/profile-logout-button";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function UsernameProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Profil utilisateur</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Informations de base du compte et avatar par defaut.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Compte {username}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Image
              src="/profil.png"
              alt="Photo de profil"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border object-cover"
            />
            <div>
              <p className="text-base font-medium">@{username}</p>
              <p className="text-sm text-muted-foreground">
                Ce compte utilise l&apos;image de profil par defaut.
              </p>
              <div className="mt-3">
                <ProfileLogoutButton />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-muted-foreground">Role</p>
              <p className="mt-1 font-medium">Utilisateur</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-muted-foreground">Statut</p>
              <p className="mt-1 font-medium">Actif</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <ProfileHistory username={username} />
      </div>
    </section>
  );
}
