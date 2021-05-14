const AzureDevopsConnectionMetadata = {
  type: "Azure Devops Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Personal Access Token",
      id: "accessToken",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      accessToken: ""
    }
};

export default AzureDevopsConnectionMetadata;