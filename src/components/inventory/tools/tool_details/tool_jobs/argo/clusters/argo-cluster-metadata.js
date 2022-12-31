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
      label: "Cluster Type",
      id: "clusterType"
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
    {
      label: "IAM Roles", 
      id:"iamRoleFlag"
    },
    {
      label: "IAM Role",
      id: "roleArn"
    },
    {
      label: "IAM Role Name",
      id: "roleSessionName"
    },
    {
      label: "Enable Argo Rollouts for Blue/Green Deployment",
      id: "argoRolloutsEnabled",
      helpTooltipText: "Please use this toggle button to enable/disable installation of Argo Rollouts plugin during cluster creation. The Argo Rollouts plugin, enables us to perform Blue Green deployment in the kubernetes cluster, through Argo CD."
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
    iamRoleFlag: false,
    roleArn: "",
    roleSessionName: "",
    clusterType: "",
    argoRolloutsEnabled: false,
  }
};

export default argoClusterMetadata;
