"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usernameFromUser, type StoredAuthUser } from "@/lib/auth-user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
type RegisterRole = "client" | "fournisseur";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<RegisterRole>("client");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          role,
        }),
      });

      const data = (await response.json()) as {
        token?: string;
        user?: StoredAuthUser;
        error?: string;
      };

      if (!response.ok || !data.token) {
        setError(data.error || "Impossible de creer le compte.");
        return;
      }

      window.localStorage.setItem("auth_token", data.token);
      if (data.user) {
        window.localStorage.setItem("auth_user", JSON.stringify(data.user));
        window.localStorage.setItem("auth_username", usernameFromUser(data.user));
      }
      router.push("/");
    } catch {
      setError("Une erreur reseau est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Creer un compte</CardTitle>
        <CardDescription>Entrez vos informations pour creer votre compte</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nom complet</FieldLabel>
              <Input
                id="name"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                Nous utiliserons cet email pour vous contacter. Il ne sera pas partage.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Type de compte</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm",
                    role === "client" ? "border-primary bg-primary/10 font-semibold" : "bg-white",
                  )}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole("fournisseur")}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm",
                    role === "fournisseur" ? "border-primary bg-primary/10 font-semibold" : "bg-white",
                  )}
                >
                  Fournisseur
                </button>
              </div>
              <FieldDescription>
                Choisissez votre role pour activer le bon espace apres connexion.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <FieldDescription>Doit contenir au moins 8 caracteres.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirmer le mot de passe</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <FieldDescription>Veuillez confirmer votre mot de passe.</FieldDescription>
            </Field>
            {error ? (
              <p className="text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creation..." : "Creer un compte"}
                </Button>
                <Button variant="outline" type="button" disabled>
                  S&apos;inscrire avec Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Deja un compte ? <Link href="/login">Se connecter</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
