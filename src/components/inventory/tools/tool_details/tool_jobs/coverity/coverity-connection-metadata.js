const CoverityConnectionMetadata = {
    type: "Coverity Connect Tool Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Coverity Connect URL",
        id: "coverityUrl",
        isRequired: true
      },
      {
        label: "Username",
        id: "coverityUsername",
        isRequired: true
      },
      {
        label: "Password",
        id: "coverityPassword",
        isRequired: true
      },
      
    ],
    newObjectFields:
      {
        coverityUrl: "",
        coverityUsername: "",
        coverityPassword: "",
      }
  };
  
  export default CoverityConnectionMetadata;