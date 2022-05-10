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
    }
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
    "servicenow-priorities": [],
    "servicenow-tools": "",
  }
};