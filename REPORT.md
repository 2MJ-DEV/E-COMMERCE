# Rapport de TP : Création de « MarchéLocal »

Objet : Vente en ligne de produits frais (Légumes & Viandes) en circuit court.

## 1. Choix de la Méthodologie : Agile (Scrum)
Pour ce projet, nous adoptons la méthodologie Agile.

**Justification :** Le e‑commerce de produits frais comporte des incertitudes (logistique, stocks variables). L’Agile permet de livrer une version de base rapidement et d’ajouter la catégorie « Viande » (plus complexe) dans un second temps après avoir testé la livraison des « Légumes ».

## 2. Procédures de Mise en Œuvre (Les 5 Étapes)

**Étape 1 : Analyse et Backlog (Cadrage)**
Nous listons toutes les fonctionnalités nécessaires dans un Product Backlog.
- Priorité 1 : Catalogue légumes, Panier, Paiement.
- Priorité 2 : Gestion de la chaîne du froid pour la viande.
- Priorité 3 : Système de parrainage et avis clients.

**Étape 2 : Conception UX/UI (Maquettage)**
Réalisation des interfaces sur Figma en se concentrant sur la « Réassurance » :
- Affichage clair de l’origine des produits.
- Compteur de fraîcheur (date de récolte/découpe).

**Étape 3 : Développement par Sprints (Incrémentation)**
Le projet est divisé en 2 sprints de 3 semaines :
- Sprint A (Légumes) : Mise en place de la boutique et du paiement Stripe.
- Sprint B (Viande) : Ajout des options de poids variable (ex : entre 450g et 550g) et gestion des camions frigorifiques.

**Étape 4 : Procédure de Test (Recette)**
Avant le lancement, nous appliquons une procédure rigoureuse :
- Test unitaire : Vérifier que le calcul de la TVA est correct.
- Test de charge : Simuler 500 commandes simultanées.
- Test de livraison : Vérifier que la température de la viande reste sous 4°C durant le transport.

**Étape 5 : Lancement et Itération**
Mise en ligne (Go‑Live) et analyse des données via Google Analytics. Si les clients demandent des produits laitiers, cela fera l’objet d’un nouveau cycle itératif.

## 3. Tableau de Gestion des Risques

| Risque | Impact | Solution |
| --- | --- | --- |
| Rupture de stock | Élevé | Synchronisation des stocks artisans en temps réel. |
| Chaîne du froid brisée | Critique | Utilisation de capteurs de température connectés. |
| Paiement refusé | Moyen | Intégration de PayPal en complément de la CB. |

## 4. Conclusion
L’utilisation de la méthode incrémentale permet de générer du chiffre d’affaires avec les légumes dès le premier mois, tandis que l’aspect itératif permet d’affiner l’expérience utilisateur pour les produits plus sensibles comme la viande.

---

# Architecture Technique (Monorepo)

## Stack retenue
- Frontend : Next.js (React)
- Backend : Node.js + Express
- IA Recommandation : FastAPI (mock d’API)
- Auth : JWT (rôles superadmin, vendeur, client). OAuth Google/GitHub prévu.

## Structure
```
MARKET_FRESH/
  apps/
    web/    (Next.js)
    api/    (Express)
    ai/     (FastAPI)
  package.json
  pnpm-workspace.yaml
```

## Rôles
- superadmin : gestion globale, validation vendeurs, configuration plateforme.
- vendeur : catalogue, stocks, commandes, logistique.
- client : navigation, panier, achats, avis.
