const azureAcrPushStepFormMetadata = {
  type: "Azure Acr Push Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",  
      isRequired: true
    },
    {
      label: "Jenkins Job",
      id: "toolJobName",
    },
    {
      label: "Jenkins Job",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequired: true
    },
    {
      label: "Build Step",
      id: "buildStepId", 
      isRequired: true
    },
    {
      label: "Azure Registry",
      id: "azureRegistryName",
      isRequired: true
    },
    // {
    //   label: "Azure Credential",
    //   id: "azureCredentialId",
    //   isRequired: true
    // },
    {
      label: "Resource",
      id: "resource",
      isRequired: true
    },
    {
      label: "Use Existing Repository?",
      id: "newRepo",
    },
    {
      label:"Repository Name",
      id:"azureRepoName",
    },
    {
      label:"Use Run Count as Repository Tag?",
      id:"useRunCount"
    }
  ],
  newObjectFields: {
    toolConfigId: "",
    toolName:"",
    toolJobId:"",
    jobType:"",
    toolJobName: "",
    buildType: "",
    agentLabels:"",
    azureToolConfigId: "",
    buildStepId: "",    
    azureRegistryName: "",
    newRepo: false,
    azureRepoName:"",
    useRunCount:false,
    // azureCredentialId:"",
    resource: "https://management.azure.com",
    awsToolConfigId:"",
    ecrRepoName:"" ,
    acrLoginUrl:"", 
    autoScaleEnable: true,
    
  }
};

export default azureAcrPushStepFormMetadata;