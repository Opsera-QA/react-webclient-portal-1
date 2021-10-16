const platformToolsMetadata = {
  idProperty: "_id",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Port",
      id: "port",
      isRequired: true
    },
    {
      label: "Status",
      id: "toolStatus",
    },
    {
      label: "Version Number",
      id: "versionNumber",
    },
    {
      label: "Install Date",
      id: "installationDate",
    },
    {
      label: "URL",
      id: "toolURL",
    },
    {
      label: "DNS",
      id: "dnsName",
    },
  ]
};

export default platformToolsMetadata;