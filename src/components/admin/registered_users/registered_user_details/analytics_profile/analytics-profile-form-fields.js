// TODO: put metadata on node server and pull down that way?
const analyticsProfileMetadata = {
  type: "Analytics Profile",
  idProperty: "_id",
  fields: [
    {
    label: "Enabled Tools",
    id: "enabledTools",
  },
  {
    label: "Default Persona",
    id: "defaultPersona",
  },
  {
    label: "Data Usage",
    id: "dataUsage",
  },
  {
    label: "Active",
    id: "active",
  },
  {
    label: "Hits Index",
    id: "hitsIndex",
  },
  {
    label: "Server Url",
    id: "analyticsServerUrl",
  },
  {
    label: "Allow Data",
    id: "allowData",
  },
    {
    label: "Workflow: Infrastructure",
    id: "Infrastructure",
  },
  {
    label: "Workflow: Pipeline",
    id: "Pipeline",
  },
    ],
  newObjectFields: {
    "Infrastructure": false,
    "Pipeline": false,
    "defaultPersona": "",
    "analyticsServerUrl" : "",
    "hitsIndex": "",
    "dataUsage": "",
    "active": true,
    "allowData": false,
    "enabledTools": []
  }
};

export default analyticsProfileMetadata;


