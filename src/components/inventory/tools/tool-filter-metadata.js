import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const toolFilterMetadata = {
  idProperty: "_id",
  type: "Tool",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tool Identifier",
      id: "toolIdentifier",
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
      label: "Tool Owner",
      id: "owner"
    },
    {
      label: "Tag",
      id: "tag",
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

    if (filterDto.getData("status") != null) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(filterDto.getFilterValue("status"))}`});
    }

    if (filterDto.getData("toolIdentifier") != null) {
      activeFilters.push({filterId: "toolIdentifier", text: `Tool: ${filterDto.getData("toolIdentifier")["text"]}`});
    }

    if (filterDto.getData("tag") != null) {
      const tag = filterDto.getData("tag");
      activeFilters.push({filterId: "tag", text: `Tag: ${tag?.value}`});
    }

    if (filterDto.getData("owner") != null) {
      activeFilters.push({filterId: "owner", text: `Owner: ${filterDto.getFilterText("owner")}`});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Sort: Name", value: "name"},
    search: "",
    activeFilters: [],
    viewType: "cards",
  },
  // TODO: If these are the same options everywhere, move to PageSort
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Name", option: "name"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default toolFilterMetadata;