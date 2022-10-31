const cypressConnectionMetadata = {
  type: "Cypress Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Jenkins Container URL",
      id: "jenkinsUrl",
      isRequired: true,
      isSecureUrl: true,
    },
    {
      label: "Jenkins Port",
      id: "jenkinsPort",
      maxLength: 5
    },
    {
      label: "Jenkins User ID",
      id: "jUserId",
      isRequired: true,
    maxLength: 50
    },
    {
      label: "Jenkins Token",
      id: "jAuthToken",
      isRequired: true,
      maxLength: 500
    },
  ],
  newObjectFields:
    {
      jenkinsUrl: "",
      jenkinsPort: "",
      jUserId: "",
      jAuthToken: ""
    }
};

export default cypressConnectionMetadata;