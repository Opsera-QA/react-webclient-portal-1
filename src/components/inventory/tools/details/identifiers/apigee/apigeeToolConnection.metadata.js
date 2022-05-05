export const apigeeToolConnectionMetadata = {
  type: "Apigee Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Version",
      id: "version",
      isRequired: true,
    },
    {
      label: "Zone",
      id: "zoneId",
      isRequired: true,
      maxLength: 2048,
    },
    {
      label: "Username",
      id: "accountUsername",
      isRequired: true,
      maxLength: 2048,
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true,
      maxLength: 2048,
    },
  ],
  newObjectFields: {
    version: "edge",
    zoneId: "",
    userName: "",
    password: "",
  }
};
