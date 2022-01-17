const argoClusterMetadata = {
  type: "Argo Cluster",
  fields: [
    {
      label: "Cluster Name",
      id: "clusterName",
      isRequired: true,
    },
    {
      label: "Platform",
      id: "platform",
      isRequired: true
    },
    {
      label: "Platform Tool Id",
      id: "platformToolId",
      isRequired: true
    },
    {
      label: "Resource Group",
      id: "resourceGroup"
    },
    {
      label: "Azure Application Id",
      id: "azureApplicationId"
    },
    {
      label: "Cluster Name",
      id: "name"
    },
    {
      label: "Server",
      id: "server"
    },
    {
      id: "clientId"
    },
    {
      id: "clientSecret"
    },
  ],
  newObjectFields: {
    clusterName: "",
    platform: "",
    platformToolId: "",
    resourceGroup: "",
    azureApplicationId: "",
    name: "",
    server: "",
    clientId: "",
    clientSecret: "",
  }
};

export default argoClusterMetadata;
