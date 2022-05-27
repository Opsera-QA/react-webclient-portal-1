const DeploymentAnalyticsMetadata = {
    idProperty: "_id",
    type: "Deployment Analysis",
    fields:[
      {label: "Artifact/Image Name", id: "artifactoryName"},
      {label: "Pipeline Name", id: "pipelineName"},
      {label: "Run Count", id: "runCount"},
      {label: "Timestamp", id: "timeStamp"},
      {label: "Deployment Status", id: "status"},
      {label: "Version", id: "version"},
      {label: "Environment", id: "destination"},
      {label: "Namespace", id: "namespace"},
    ],
    newObjectFields: {
    }
  };
  
  export default DeploymentAnalyticsMetadata;
