// Allowed roles for the application.
const ROLES = ["superadmin", "fournisseur", "client"];

// Validate role value.
function isValidRole(role) {
  return ROLES.includes(role);
}

export { ROLES, isValidRole };
