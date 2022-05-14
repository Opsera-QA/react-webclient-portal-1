// TODO: We should really rework the way the ids are for these at some point
export const serviceNowMeanTimeToResolutionMetadata = {
  type: "Service Now Mean Time To Resolution",
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
      label: "Service Now Priorities",
      id: "servicenow-priorities",
    },
    {
      label: "Service Now Tool",
      id: "servicenow-tools",
    },
    {
      label: "Service Now Assignment Groups",
      id: "servicenow-assignment-groups",
    },
    {
      label: "Service Now Service Offerings",
      id: "servicenow-service-offerings",
    },
    {
      label: "Service Now Configuration Items",
      id: "servicenow-configuration-items",
    },
    {
      label: "Service Now Business Services",
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