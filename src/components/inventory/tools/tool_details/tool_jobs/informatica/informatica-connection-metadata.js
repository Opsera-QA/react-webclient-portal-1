const InformaticaConnectionMetadata = {
  type: "Informatica Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Username",
      id: "userName",
      isRequired: true
    },
    {
      label: "Password",
      id: "password",
      isRequired: true
    },
    {
      label: "Regions",
      id: "regions",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      userName: "",
      password: "",
      regions: ""
    }
};

export default InformaticaConnectionMetadata;