export const leadTimeAndReleaseTraceabilityMetadata = {
  type: "Lead Time And Release Traceability",
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
      label: "",
      id: "amex-filters",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
    amexFilters: {
      application: [],
      director: [],
      vp1: [],
      vp2: [],
      svp: [],
      action: [],
    },
  },
};
