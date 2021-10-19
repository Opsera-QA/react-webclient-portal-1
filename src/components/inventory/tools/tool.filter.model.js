import FilterModelBase from "core/data_model/filterModel.base";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const toolFilterMetadata = {
  idProperty: "_id",
  type: "Tool",
  fields: [
    {
      label: "Active Status",
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
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Name", option: "name"},
    search: "",
    activeFilters: [],
    viewType: "card",
  },
};

export class ToolFilterModel extends FilterModelBase {
  constructor() {
    super(toolFilterMetadata);
  }

  canSearch = () => {
    return true;
  };

  showPagination = () => {
    return true;
  };

  getActiveFilters = () => {
    let activeFilters = [];

    if (this.getData("status") != null) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(this.getFilterValue("status"))}`});
    }

    if (this.getData("toolIdentifier") != null) {
      activeFilters.push({filterId: "toolIdentifier", text: `Tool: ${this.getData("toolIdentifier")["text"]}`});
    }

    if (this.getData("tag") != null) {
      const tag = this.getData("tag");
      activeFilters.push({filterId: "tag", text: `Tag: ${tag?.value}`});
    }

    if (this.getData("owner") != null) {
      activeFilters.push({filterId: "owner", text: `Owner: ${this.getFilterText("owner")}`});
    }

    if (this.getData("search") != null && this.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${this.getData("search")}`});
    }

    return activeFilters;
  };

  canSort = () => {
    return true;
  };

  getDetailViewLink = (toolId) => {
    return `/inventory/tools/details/${toolId}`;
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest", option: "oldest"},
        {text: "Newest", option: "newest"},
        {text: "Name", option: "name"},
        {text: "Last Updated", option: "lastupdated"},
      ]
    );
  };
}

export default ToolFilterModel;


