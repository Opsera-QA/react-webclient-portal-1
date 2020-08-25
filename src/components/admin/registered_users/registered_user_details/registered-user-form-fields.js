// TODO: put metadata on node server and pull down that way?
const analyticsUserFormFields = {
  enabledTools: {
    label: "Enabled Tools",
    id: "enabledTools",
    rules: {
      isRequired: false 
    }
  },
  defaultPersona: {
    label: "Default Persona",
    id: "defaultPersona",
    rules: {
      isRequired: false 
    }
  },
  dataUsage: {
    label: "Data Usage",
    id: "dataUsage",
    rules: {
      isRequired: false 
    }
  },
  active: {
    label: "Active",
    id: "active",
    rules: {
      isRequired: false 
    }
  },  
  hitsIndex: {
    label: "Hits Index",
    id: "hitsIndex",
    rules: {
      isRequired: false 
    }
  },   
  analyticsServerUrl: {
    label: "Server Url",
    id: "analyticsServerUrl",
    rules: {
      isRequired: false 
    }
  },
  allowData: {
    label: "Allow Data",
    id: "allowData",
    rules: {
      isRequired: false 
    }
  },  
  Infrastructure: {
    label: "Workflow: Infrastructure",
    id: "Infrastructure",
    rules: {
      isRequired: false 
    }
  },
  Pipeline: {
    label: "Workflow: Pipeline",
    id: "Pipeline",
    rules: {
      isRequired: false 
    }
  },  
};

export default analyticsUserFormFields;


