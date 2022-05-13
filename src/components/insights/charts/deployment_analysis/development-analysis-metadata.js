const deploymentAnalysisMetadata = {
    idProperty: "_id",
    type: "Deployment Analysis",
    fields:[
      {label: "Artifactory Name", id: "artifactoryName"},
      {label: "Pipeline Name", id: "pipelineName"},
      {label: "Run Count", id: "runCount"},
      //{label: "Time Stamp", id: "timeStamp"},
      {label: "Deployment Status", id: "status"},
      {label: "Version", id: "version"},
      
      {label: "Environment", id: "destination"},
      // {label: "Namespace", id: "namespace"},
      // {label: "Pipeline Id", id: "pipelineId"},
      // {label: "Metadata Name", id: "metadataName"},
    ],
    newObjectFields: {
    }
  };
  
  export default deploymentAnalysisMetadata;