const BuildDetailsMetadata = {
    idProperty: "_id",
    type: "Build Details",
    fields: [
      {
        label: "Name",
        id: "pipeline_name",
      },
      {
        label: "Run",
        id: "run_count",
      },
      {
        label: "Started By",
        id: "owner",
      },
      {
        label: "Status",
        id: "status",
      },
      {
        label: "Security Status",
        id: "security_status",
      },
      {
        label: "Deployment Status",
        id: "deployment_status",
      },
      {
        label: "Timestamp",
        id: "timestamp",
      },
    ],
    newObjectFields: {},
  };
  
  export default BuildDetailsMetadata;
  