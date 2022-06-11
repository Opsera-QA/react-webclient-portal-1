import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";

const kpiFilterMetadata = {
  idProperty: "_id",
  type: "Kpi",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tag Type",
      id: "type",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Total Count",
      id: "totalCount",
    },
    {
      label: "Sort Option",
      id: "sortOption",
    },
    {
      label: "Policy Support",
      id: "policySupport",
    },
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];

    const status = filterDto.getFilterValue("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Active Status: ${capitalizeFirstLetter(status)}`});
    }

    const search = filterDto.getFilterValue("search");

    if (hasStringValue(search) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${search}`});
    }

    const policySupport = filterDto.getFilterValue("policySupport");

    if (hasStringValue(policySupport) === true) {
      activeFilters.push({filterId: "policySupport", text: `Policy Support: ${capitalizeFirstLetter(policySupport)}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Sort: Newest", value: "newest"},
    search: "",
    policySupport: undefined,
    activeFilters: []
  },
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default kpiFilterMetadata;