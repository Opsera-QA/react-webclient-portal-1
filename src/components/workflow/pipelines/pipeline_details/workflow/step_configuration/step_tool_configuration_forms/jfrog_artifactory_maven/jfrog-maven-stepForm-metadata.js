const jfrogMavenStepFormMetadata = {
  type: "JFrog Artifactory Maven Tool Configuration",
  fields: [            
    {
      label: "Build Step",
      id: "artifactStepId",
      isRequired: true
    },
    {
      label: "Repository Name",
      id: "repositoryName",
      isRequired: true
    },
    {
      label: "Repository Format",
      id: "repositoryFormat",
      isRequired: true
    },    
    {
      label: "Step Tool",
      id: "jfrogToolConfigId",
      isRequired: true
    },    
    {
      label: "Group Name",
      id: "groupName",
      regexDefinitionName: "generalText",
      maxLength: 50,
      isRequiredFunction: (model) => {
        return model?.getData("repositoryFormat") === "Maven";
      },
    },
    {
      label: "Artifact Name",
      id: "artifactName",
      regexDefinitionName: "generalText",
      maxLength: 50,
      isRequiredFunction: (model) => {
        return model?.getData("repositoryFormat") === "Maven";
      },
    },
    {
      label: "Package ID",
      id: "packageId"
    },
    {
      label: "JFrogStep Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Use Run count as version?",
      id: "customVersion",
    },
    {
      label: "Server Path",
      id: "serverPath",
      regexDefinitionName: "pathField",
      isRequiredFunction: (model) => {
        return model?.getData("repositoryFormat") === "NuGet";
      },
    },
  ],
  newObjectFields: {    
    jfrogToolConfigId: "",
    repositoryName : "",
    repositoryFormat: "Maven",    
    groupName: "",
    artifactName: "",
    type: "",    
    artifactStepId: "",
    serverPath: "",
    packageId : "",
    customVersion: true,
  }
};

export default jfrogMavenStepFormMetadata;
