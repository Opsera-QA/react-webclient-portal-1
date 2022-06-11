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

      const status = filterModel.getFilterValue("status");

      if (hasStringValue(status) === true) {
        activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
      }

      const type = filterModel.getFilterValue("type");

      if (hasStringValue(type) === true) {
        activeFilters.push({filterId: "type", text: `Type: ${capitalizeFirstLetter(type)}`});
      }

      const search = filterModel.getFilterValue("search");

      if (hasStringValue(search) === true) {
        activeFilters.push({filterId: "search", text: `Keywords: ${search}`});
      }


      const owner = filterModel.getFilterValue("owner");
      const ownerName = filterModel.getFilterValue("ownerName");

      if (hasStringValue(owner) === true && hasStringValue(ownerName) === true) {
        activeFilters.push({filterId: "owner", text: `Owner: ${ownerName}`});
      }

      const isFavorite = filterModel.getFilterValue("isFavorite");

      if (hasStringValue(isFavorite) === true) {
        activeFilters.push({filterId: "isFavorite", text: `Only Show Favorites`});
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