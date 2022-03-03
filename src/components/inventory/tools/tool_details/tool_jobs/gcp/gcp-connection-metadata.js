const GcpConnectionMetadata = {
  type: "GCP Tool Configuration",
  idProperty: "_id",
  fields: [    
    {
      label: "GCP Config File",
      id: "gcpConfigFile",
      isRequired: true
    },
    {
      label: "GCP Config file name",
      id: "fileName"
    },
  ],
  newObjectFields:
    {      
      gcpConfigFile: "",
      fileName: ""
    }
};

export default GcpConnectionMetadata;