export const resetMetricMetadata = {
  idProperty: "_id",
  type: "KPI",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Internal Properties",
      id: "internalProperties",
      formText: `
      When new features are added, sometimes the internal data needs to be reset to enable those features.
      This includes resetting saved filter values.
      `,
    },
  ],
  newObjectFields: {
    name: false,
    internalProperties: false,
  },
};
