// TODO: put metadata on node server and pull down that way?
const kpiMetaData = {
  idProperty: "name",
  type: "KPI",
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Tool Identifier",
      id: "tool_identifier",
      isRequired: true
    },
    {
      label: "Status",
      id: "active",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
    {
      label: "ID",
      id: "_id",
    },
  ],
  newObjectFields: {
    "name": "",
    "description": "",
    "tool_identifier": [],
    "type": "",
    "active": true,
    "persona": ["manager","developer", "executive"]
  }
};

export default kpiMetaData;