const nexusStepFormMetadata = {
  type: "Nexus Tool Configuration",
  fields: [
    {
      label: "Group Name",
      id: "groupName",
      regexDefinitionName: "generalText",
      maxLength: 50,
    },
    {
      label: "Artifact Name",
      id: "artifactName",
      regexDefinitionName: "generalText",
      maxLength: 50,
    },
    {
      label: "Nexus Step Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Repository Format",
      id: "repositoryFormat",
      isRequired: true
    },
    {
      label: "Repository Name",
      id: "repositoryName",
      isRequired: true
    },
    {
      label: "Select Build Step",
      id: "artifactStepId",
      isRequired: true
    },
    {
      label: "Use Run count as version?",
      id: "customVersion",
    },
    {
      id: "repositoryGroup",
      isRequired: true
    },
    {
      label: "Step Tool",
      id: "nexusToolConfigId",
      isRequired: true
    },
    {
      label: "Package ID",
      id: "packageId"
    },
    {
      label: "Port",
      id: "dockerPort",
      regexDefinitionName: "numericalField",
      maxLength: 4,
    },
    {
      label: "Select Jenkins Tool",
      id: "toolConfigId"      
    },
    {      
      id: "jobType"      
    },
    {      
      id: "jobDescription"      
    },
    {      
      id: "toolJobType"
    },
    {      
      id: "agentLabels"
    },
    {      
      id: "jobName"
    },    
  ],
  newObjectFields: {
    groupName: "",
    artifactName: "",
    type: "",
    repositoryFormat: "maven2",
    repositoryName: "",
    artifactStepId: "",
    customVersion: false,
    repositoryGroup : "",
    nexusToolConfigId: "",
    packageId : "",
    dockerPort: "",
    toolConfigId: "",
    jobType: "",
    jobDescription: "",
    toolJobType: "",
    agentLabels: "",
    jobName: ""
  }
};

export default nexusStepFormMetadata;
