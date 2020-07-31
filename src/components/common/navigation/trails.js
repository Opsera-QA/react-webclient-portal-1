const trails = {
  // Accounts
  ldapDashboard: {parent: undefined, destination: {path: "accounts", label: "Account Management"}},
  ldapOrganizationManagement: {parent: "ldapDashboard", destination: {path: "organizations", label: "Organizations"}},
  ladpOrganizationDetailView: {parent: "ldapOrganizationManagement", destination: {path: "detail", label: "Accounts"}},
}

const getParentTrail = (parentPath, trails) => {
  return {trail: [trails[parentPath].trail, trails[parentPath].destination]};
};

export const getTrail = (destination) => {
  console.log("Destination: " + destination);
  console.log("Trail: " + JSON.stringify(trails[destination]));
  let trail = trails[destination];
  let breadcrumbPath = [];
  let endPath = trail.destination;

  while (trail.parent != null) {
    trail = trails[trail.parent];
    breadcrumbPath.unshift(trail.destination);
  }

  let fullTrail = {trail: breadcrumbPath, destination: endPath};
  console.log("Full tree: " + JSON.stringify(fullTrail));

  return fullTrail;
};