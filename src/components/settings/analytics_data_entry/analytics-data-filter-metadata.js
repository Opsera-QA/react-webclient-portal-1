import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";

const analyticsDataFilterMetadata = {
  idProperty: "_id",
  type: "Entry",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Status",
      id: "status",
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
      label: "Search",
      id: "search",
    },
    {
      label: "KPI",
      id: "identifier",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
  ],
  getActiveFilters(filterModel) {
    const activeFilters = [];

    if (filterModel == null) {
      return filterModel;
    }

    const status = filterModel.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const searchKeyword = filterModel.getData("search");

    if (hasStringValue(searchKeyword) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchKeyword}`});
    }

    const identifier = filterModel.getData("identifier");
    const identifierName = filterModel.getData("identifierName");

    if (hasStringValue(identifier) === true && hasStringValue(identifierName) === true) {
      activeFilters.push({ filterId: "identifier", text: `KPI: ${identifierName}` });
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Sort: KPI", value: "kpi_identifier"},
    search: "",
    activeFilters: []
  },
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "KPI", option: "kpi_identifier"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default analyticsDataFilterMetadata;