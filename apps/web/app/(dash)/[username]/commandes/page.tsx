type OrdersPageProps = {
  params: Promise<{ username: string }>;
};

export default async function UsernameOrdersPage({ params }: OrdersPageProps) {
  const { username } = await params;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Commandes de {username}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Historique des commandes via URL personnalisee utilisateur.
      </p>
    </section>
  );
}
