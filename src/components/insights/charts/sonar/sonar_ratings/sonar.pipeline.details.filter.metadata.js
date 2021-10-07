const sonarPipelineDetailsFilterMetadata = {
    idProperty: "_id",
    type: "Sonar Pipeline Details Filter Metadata",
    fields: [      
      {
        label: "Page Size",
        id: "pageSize",
      },
      {
        label: "Total Count",
        id: "totalCount",
      },      
    ],
    newObjectFields: {
      pageSize: 50,
      currentPage: 1, 
    },    
  };
  
  export default sonarPipelineDetailsFilterMetadata;