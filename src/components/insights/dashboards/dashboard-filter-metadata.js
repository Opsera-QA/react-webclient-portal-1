import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

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
    getActiveFilters(filterDto) {
      let activeFilters = [];

      if (filterDto.getData("status") != null) {
        activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(filterDto.getFilterValue("status"))}`});
      }

      if (filterDto.getData("type") != null) {
        activeFilters.push({filterId: "type", ...filterDto.getData("type")});
      }
  
      if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
        activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
      }

      if (filterDto.getData("isFavorite") != null && filterDto.getData("isFavorite") !== "") {
        activeFilters.push({filterId: "isFavorite", ...filterDto.getData("isFavorite")});
      }
  
      return activeFilters;
    },
    newObjectFields: {
      pageSize: 50,
      currentPage: 1,
      sortOption: {text: "Sort: Name", value: "name"},
      search: "",
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
}

export default dashboardFilterMetadata;