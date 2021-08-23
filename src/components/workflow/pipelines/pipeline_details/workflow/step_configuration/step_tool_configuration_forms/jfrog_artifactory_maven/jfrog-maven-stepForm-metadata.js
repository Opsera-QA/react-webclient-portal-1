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
        isRequired: true
      },
      {
        label: "Artifact Name",
        id: "artifactName",
        regexDefinitionName: "generalText",
        maxLength: 50,
        isRequired: true
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
    ],
    newObjectFields: {    
      jfrogToolConfigId: "",
      repositoryName : "",
      repositoryFormat: "maven2",    
      groupName: "",
      artifactName: "",
      type: "",    
      artifactStepId: "",
      packageId : "",
      customVersion: true,
    }
  };
  
  export default jfrogMavenStepFormMetadata;
  