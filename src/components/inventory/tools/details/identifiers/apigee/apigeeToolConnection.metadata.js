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
      id: "zone",
      isRequired: true,
      maxLength: 2048,
    },
    {
      label: "Username",
      id: "userName",
      isRequired: true,
      maxLength: 2048,
    },
    {
      label: "Password",
      id: "password",
      isRequired: true,
      maxLength: 2048,
    },
  ],
  newObjectFields: {
    version: "edge",
    zone: "",
    userName: "",
    password: "",
  }
};
