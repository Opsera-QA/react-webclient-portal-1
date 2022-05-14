import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";

const dashboardFilterMetadata = {
    idProperty: "_id",
    type: "Dashboard",
    fields: [
      {
        label: "Status",
        id: "status",
      },
      {
        label: "Dashboard Type",
        id: "type",
      },
      {
        label: "Owner",
        id: "owner",
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
        label: "Active Filters",
        id: "activeFilters",
      },
      {
        label: "Favorites",
        id: "isFavorite",
      },
    ],
    getActiveFilters(filterModel) {
      const activeFilters = [];

      if (hasStringValue(filterModel.getFilterValue("status")) === true) {
        activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(filterModel.getFilterValue("status"))}`});
      }

      if (hasStringValue(filterModel.getFilterValue("type")) === true) {
        activeFilters.push({filterId: "type", text: `Type: ${capitalizeFirstLetter(filterModel.getFilterValue("type"))}`});
      }
  
      if (hasStringValue(filterModel.getFilterValue("search")) === true) {
        activeFilters.push({filterId: "search", text: `Keywords: ${filterModel.getFilterValue("search")}`});
      }

      if (hasStringValue(filterModel.getFilterValue("isFavorite")) === true) {
        activeFilters.push({filterId: "isFavorite", ...filterModel.getData("isFavorite")});
      }
  
      return activeFilters;
    },
    newObjectFields: {
      pageSize: 50,
      currentPage: 1,
      sortOption: {text: "Sort: Name", value: "name"},
      search: "",
      status: "",
      owner: "",
      type: "",
      isFavorite: "",
      activeFilters: []
    },
    // TODO: If these are the same options everywhere, move to PageSort
    sortOptions: [
      {text: "Oldest", option: "oldest"},
      {text: "Newest", option: "newest"},
      {text: "Name", option: "name"},
      {text: "Type", option: "type"},
      {text: "Last Updated", option: "lastupdated"}
    ]
};

export default dashboardFilterMetadata;