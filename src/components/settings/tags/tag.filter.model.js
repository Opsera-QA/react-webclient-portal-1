import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import { toolHelper } from "components/inventory/tools/tool.helper";

const tagFilterMetadata = {
  idProperty: "_id",
  type: "Tag",
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
    sortOption: {text: "Sort: Type", value: "type"},
    search: "",
    activeFilters: [],
  },
};

export class TagFilterModel extends FilterModelBase {
  constructor() {
    super(tagFilterMetadata);
  }

  canSearch = () => {
    return true;
  };

  showPagination = () => {
    return true;
  };

  getActiveFilters = () => {
    const activeFilters = [];
    const status = this.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const type = this.getData("type");

    if (hasStringValue(type) === true) {
      activeFilters.push({filterId: "type", text: `Type: ${capitalizeFirstLetter(type)}`});
    }

    const search = this.getData("search");

    if (hasStringValue(search) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${search}`});
    }

    return activeFilters;
  };

  canSort = () => {
    return true;
  };

  canToggleView = () => {
    return true;
  };

  getDetailViewLink = (toolId) => {
    return toolHelper.getDetailViewLink(toolId);
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest", option: "oldest"},
        {text: "Newest", option: "newest"},
        {text: "Value", option: "value"},
        {text: "Type", option: "type"},
        {text: "Last Updated", option: "lastupdated"},
      ]
    );
  };
}