export const analyticsDataEntryMetadata = {
  idProperty: "name",
  type: "Entry",
  detailView: function (record) {
    return `/settings/analytics-data-entries/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `${record.getOriginalValue("kpi_identifier")} Analytics Data Entry`;
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
      label: "Domain Name",
      id: "data.domain",
    },
    {
      label: "Application Name",
      id: "data.application",
    },
    {
      label: "From",
      id: "data.from",
    },
    {
      label: "To",
      id: "data.to",
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