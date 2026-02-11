-- Rename role enum value from vendeur to fournisseur while preserving existing rows.
ALTER TYPE "Role" RENAME VALUE 'vendeur' TO 'fournisseur';
