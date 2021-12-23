const InformaticaConnectionMetadata = {
  type: "Informatica Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Username",
      id: "userName",
    },
    {
      label: "Password",
      id: "password",
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