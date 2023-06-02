// TODO: We should really rework the way the ids are for these at some point
export const serviceNowMeanTimeToResolutionMetadata = {
  type: "ServiceNow Mean Time To Resolution",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Date Range",
      id: "date",
    },
    {
      label: "ServiceNow Priorities",
      id: "servicenow-priorities",
    },
    {
      label: "ServiceNow Tool",
      id: "servicenow-tools",
    },
    {
      label: "ServiceNow Assignment Groups",
      id: "servicenow-assignment-groups",
    },
    {
      label: "ServiceNow Service Offerings",
      id: "servicenow-service-offerings",
    },
    {
      label: "ServiceNow Configuration Items",
      id: "servicenow-configuration-items",
    },
    {
      label: "ServiceNow Business Services",
      id: "servicenow-business-services",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
    "servicenow-priorities": [],
    "servicenow-tools": "",
    "servicenow-assignment-groups": "",
    "servicenow-service-offerings": "",
    "servicenow-configuration-items": "",
    "servicenow-business-services": ""
  }
};