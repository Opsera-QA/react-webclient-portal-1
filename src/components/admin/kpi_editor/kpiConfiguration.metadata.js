const kpiConfigurationMetadata = {
  idProperty: "name",
  type: "KPI Configuration",
  activeField: "active",
  detailView: function(record) {
    return `/admin/kpis/${record.getData("_id")}`;
  },
  detailViewTitle: function(record) {
    return `KPI Configuration Details [${record?.getOriginalValue("name")}]`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Identifier",
      id: "identifier",
      isRequired: true
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
      label: "Data Points",
      id: "dataPoints",
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
    "dataPoints": [],
    "category": [],
    "supported_filters": [],
    "tools": [],
    "active": true,
    "policySupport": false,
    "thumbnailPath": "",
    // "persona": ["manager","developer", "executive"]
  }
};

export default kpiConfigurationMetadata;