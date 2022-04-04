const gitScrapperPipelineDetailsFilterMetadata = {
    idProperty: "_id",
    type: "Git Scrapper Metrics Filter Metadata",
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
  
  export default gitScrapperPipelineDetailsFilterMetadata;