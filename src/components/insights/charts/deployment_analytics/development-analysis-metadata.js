const DeploymentAnalyticsMetadata = {
    idProperty: "_id",
    type: "Deployment Analysis",
    fields:[
      {label: "Artifactory Name", id: "artifactoryName"},
      {label: "Pipeline Name", id: "pipelineName"},
      {label: "Run Count", id: "runCount"},
      {label: "Deployment Status", id: "status"},
      {label: "Version", id: "version"},
      {label: "Environment", id: "destination"},
    ],
    newObjectFields: {
    }
  };
  
  export default DeploymentAnalyticsMetadata;