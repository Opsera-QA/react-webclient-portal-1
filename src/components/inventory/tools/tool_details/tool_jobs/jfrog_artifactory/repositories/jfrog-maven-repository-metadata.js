const jfrogMavenRepositoryMetadata = {
    type: "JFrog Repository",
    fields: [
      {
        label: "Repository Name",
        id: "key",
        isRequired: true
      },
      {
        label: "Description",
        id: "description"
      },
      {
        label: "Type",
        id: "type"
      },
      {
        label: "Package Type",
        id: "packageType"
      },
      {
        label: "URL",
        id: "url"
      }
    ],
    newObjectFields: {
      key: "",
      description: "",
      type: "",
      packageType: "Maven",
      url: ""
    }
  };
  
  export default jfrogMavenRepositoryMetadata;