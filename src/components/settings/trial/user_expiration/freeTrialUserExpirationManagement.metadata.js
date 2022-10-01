export const freeTrialUserExpirationManagementMetadata = {
  idProperty: "name",
  type: "User",
  fields: [
    {
      label: "Select which User to revoke Free Trial access",
      id: "revokeUserId",
    },
    {
      label: "Select which User to reinstate Free Trial access",
      id: "activeUserId",
    },
    {
      label: "Select which User for which to extend Free Trial access",
      id: "extendUserId",
    },
  ],
  newObjectFields: {
    revokeUserId: "",
    activeUserId: "",
    extendUserId: "",
  }
};