// TODO: put metadata on node server and pull down that way?
const kpiMetaData = {
  idProperty: "name",
  type: "KPI",
  detailView: function(record) {
    return `/admin/kpis/${record.getData("_id")}`;
  },
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
      label: "Tools",
      id: "identifier",
    },
    {
      label: "Chart Type",
      id: "type",
    },
    {
      label: "React Component Name",
      id: "componentName",
    },
    {
      label: "Supported Tool Identifiers",
      id: "tools",
    },
    {
      label: "Supported Categories",
      id: "category",
    },
    {
      label: "Supported Filters",
      id: "filters",
    },
    {
      label: "Settings Template",
      id: "settings",
    },
    {
      label: "Thumbnail Path",
      id: "thumbnailPath",
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
    "identifier": [],
    "type": "",
    "componentName": "",
    "settings": {},
    "category": [],
    "filters": [],
    "tools": [],
    "active": true,
    "persona": ["manager","developer", "executive"]
  }
};

export default kpiMetaData;