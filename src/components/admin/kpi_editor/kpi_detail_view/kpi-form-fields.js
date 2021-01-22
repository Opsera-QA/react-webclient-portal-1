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
      label: "Identifier",
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
      label: "Supported Tools",
      id: "tools",
    },
    {
      label: "Supported Categories",
      id: "category",
    },
    {
      label: "Supported Filters",
      id: "supported_filters",
    },
    {
      label: "Settings Template",
      id: "settings",
    },
    {
      label: "Y-Axis Type",
      id: "yAxis",
    },
    {
      label: "Thumbnail Path",
      id: "thumbnailPath",
      // isWebsite: true
    },
    {
      label: "Status",
      id: "active",
    },
    {
      label: "Policy Support",
      id: "policySupport",
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
    "identifier": "",
    "type": "",
    "componentName": "",
    "settings": {},
    "category": [],
    "supported_filters": [],
    "tools": [],
    "active": true,
    "policySupport": false,
    "thumbnailPath": "",
    // "persona": ["manager","developer", "executive"]
  }
};

export default kpiMetaData;