const JenkinsJobTypeMeta = {
    type: "Jenkins Build Job",
    fields: [
      {
        label: "Agent Label",
        id: "agentLabels",
      },
    ],
    newObjectFields: {
      agentLabels: ""
    },
  };
  
  export default JenkinsJobTypeMeta;
  