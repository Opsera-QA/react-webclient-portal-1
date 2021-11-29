const jfrogMavenRepositoryMetadata = {
    type: "JFrog Repository",
    fields: [
      {
        label: "Repository Name",
        id: "key",
        isRequired: true,
        maxLength: 64,
        regexDefinitionName: "limitedText",
      },
      {
        label: "Description",
        id: "description",
        maxLength: 1000,
        regexDefinitionName: "generalTextWithSpacesSlash",
        formText: "Description can be up to 1000 characters and can consist of letters, apostrophes, numbers, spaces, dashes, colons, underscores, and periods"
      },
      {
        label: "Type",
        id: "type"
      },
      {
        label: "Package Type",
        id: "packageType",
        isRequired: true,
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
      url: "",
    }
  };
  
  export default jfrogMavenRepositoryMetadata;