const BuildDeployInsightsFilterMetadata = {
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
      pageSize: 5,
      currentPage: 1, 
      totalCount:0
    },    
  };
  
  export default BuildDeployInsightsFilterMetadata;
