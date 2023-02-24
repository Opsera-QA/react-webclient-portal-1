const argoProjectMetadata = {
  type: "Argo Project",
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Name cannot contain spaces.",
      maxLength: 63
    },
    {
      label: "Description",
      id: "description",
      isRequired: true,
      lowercase: true,
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
    },
    {
      label: "Advanced Settings",
      id: "advancedSettings",
    },
    {
      label: "Sources",
      id: "sourceRepos",      
      formText: "Repositories where application manifests are permitted to be retrieved from"
    },
    {
      label: "Destinations",
      id: "destinations",
      formText: "Cluster and namespace where applications are permitted to be deployed to"
    },
    {
      label: "Whitelisted Cluster Resources",
      id: "clusterResourceWhitelist",
      formText: "Cluster-scoped K8s API groups and Kinds which are permitted to be deployed"
    },
    {
      label: "Blacklisted Namespaced Resources",
      id: "namespaceResourceBlacklist",
      formText: "Namespace-scoped K8s API Groups and Kinfs which are prohibited from being deloyed"
    },
    {
      label: "Whitelisted Namespaced Resources",
      id: "namespaceResourceWhitelist",
      formText: "Namespace-scoped K8s API Groups and Kinds which are permitted to deploy"
    },
    {
      label: "Orphaned Resource Monitoring (Warn)",
      id: "orphanedResources",
      formText: "Enables monitoring of top level resources in the application target namespace"
    },
  ],
  newObjectFields: {
    name: "",
    sourceRepos: ["*"],
    description: "",
    advancedSettings: false,
    destinations: [],
    clusterResourceWhitelist: [],
    namespaceResourceBlacklist: [],
    namespaceResourceWhitelist: [],
    orphanedResources: false
  }
};

export default argoProjectMetadata;
