import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";

const toolIdentifierFilterMetadata = {
  idProperty: "_id",
  type: "Tool Identifier",
  fields: [
    {
      label: "Active Status",
      id: "status",
    },
    {
      label: "Enabled In Tool Registry",
      id: "registry",
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
  ],
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    totalCount: 0,
    sortOption: "name",
    search: "",
    status: "",
    activeFilters: [],
    viewType: "card",
  },
};

export class ToolIdentifierFilterModel extends FilterModelBase {
  constructor() {
    super(toolIdentifierFilterMetadata);
  }

  canSearch = () => {
    return true;
  };

  showPagination = () => {
    return false;
  };

  getActiveFilters = () => {
    const activeFilters = [];

    const status = this.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const searchKeyword = this.getData("search");

    if (hasStringValue(searchKeyword) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchKeyword}`});
    }

    return activeFilters;
  };

  canSort = () => {
    return false;
  };

  canToggleView = () => {
    return true;
  };
}
