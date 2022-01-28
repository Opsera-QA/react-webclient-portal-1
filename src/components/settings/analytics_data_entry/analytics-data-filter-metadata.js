import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

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
  getActiveFilters(filterDto) {
    let activeFilters = [];

    if (filterDto.getData("status") != null) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(filterDto.getFilterValue("status"))}`});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    if (filterDto.getData("identifier") != null && filterDto.getData("identifier") !== "") {
      const identifer = filterDto.getData("identifier");
      activeFilters.push({filterId: "identifier", text: `KPI: ${identifer?.name}`});
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