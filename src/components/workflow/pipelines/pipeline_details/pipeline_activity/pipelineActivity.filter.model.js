import FilterModelBase from "core/data_model/filterModel.base";

const pipelineActivityFilterMetadata = {
  type: "Pipeline",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Type",
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
    pageSize: 25,
    currentPage: 1,
    search: "",
    activeFilters: [],
    status: "",
    run: 0,
  },
};

export class PipelineActivityFilterModel extends FilterModelBase {
  constructor(getAccessToken, cancelTokenSource, loadData) {
    super(pipelineActivityFilterMetadata);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
  }

  canSearch = () => {
    return true;
  };

  showPagination = () => {
    return true;
  };

  getActiveFilters = () => {
    let activeFilters = [];

    if (this.getData("status") != null && this.getData("status") !== "") {
      activeFilters.push({filterId: "status", text: `Status: ${this.getFilterText("status")}`});
    }

    if (this.getData("search") != null && this.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${this.getData("search")}`});
    }

    return activeFilters;
  };
}

export default PipelineActivityFilterModel;


