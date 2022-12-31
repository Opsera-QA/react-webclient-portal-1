const defectRemovalEfficiencyConfigurationMetadata = {
    type: "Temp KPI Configuration",
    fields: [
      {
        label: "Domain Name",
        id: "domain",
        isRequired: true,
        maxLength: 20
      },
      {
        label: "Application Name",
        id: "application",
        isRequired: true,
        maxLength: 20
      },
      {
        label: "Pipeline",
        id: "pipeline_id",
        // isRequired: true
      },
      {
        label: "From",
        id: "from",
        isRequired: true
      },
      {
        label: "To",
        id: "to",
        isRequired: true
      },
      {
        label: "Sprint Name",
        id: "sprint",
        // isRequired: true,
        maxLength: 20
      },
      {
        label: "Release Name",
        id: "release",
        maxLength: 20
      },
      {
        label: "Number of Defects in Testing Phase",
        id: "testing_phase_defects_count",
        maxLength: 5,
        isRequired: true,
        formText: "Number of Defects in Testing Phase (Unit Testing + System Testing) must be 0 or a positive whole number"        
      },
      {
        label: "Number of Defects in UAT",
        id: "uat_defects_count",
        maxLength: 5,
        isRequired: true
      },
      {
        label: "Number of Defects in Post Production",
        id: "post_production_defects_count",
        maxLength: 5,
        isRequired: true
      },      
    ],
    newObjectFields: {
      domain: [],
      application: [],
      pipeline_id: "",
      from: new Date(),
      to: new Date(),
      sprint: [],
      release: [],
      testing_phase_defects_count: 0,
      uat_defects_count: 0,
      post_production_defects_count: 0,      
    }
  };
  
  export default defectRemovalEfficiencyConfigurationMetadata;
