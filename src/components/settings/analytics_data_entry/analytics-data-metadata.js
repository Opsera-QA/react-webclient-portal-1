export const analyticsDataMetadata = {
  idProperty: "name",
  type: "Entry",
  detailView: function (record) {
    return `/settings/analytics-data-entries/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Analytics Data Entry [${record.getData("kpi_identifier")}]`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "KPI",
      id: "kpi_identifier",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Owner Name",
      id: "owner_name",
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Status",
      id: "active",
    },
    {
      label: "Tags",
      id: "tags",
    },
  ],
  newObjectFields: {
    kpi_identifier: "",
    owner: "",
    data: {},
    active: true,
    tags: []
  }
};