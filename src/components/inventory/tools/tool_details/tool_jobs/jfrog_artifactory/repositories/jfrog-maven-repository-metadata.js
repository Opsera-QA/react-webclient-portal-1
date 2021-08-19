const jfrogMavenRepositoryMetadata = {
    type: "JFrog Maven Repository Configuration",
    activeField: "active",
    detailView: function (record) {
      return `/admin/organizations/details/${record.getData("name")}`;
    },
    detailViewTitle: function (record) {
      return `JFrog Maven Repository Details [${record.getOriginalValue("name")}]`;
    },
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