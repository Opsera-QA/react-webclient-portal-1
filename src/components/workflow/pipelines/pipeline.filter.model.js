import FilterModelBase from "core/data_model/filterModel.base";

const pipelineFilterMetadata = {
  type: "Pipeline",
  fields: [
    {
      label: "Active",
      id: "active",
    },
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
      label: "Owner",
      id: "owner",
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
    pageSize: 25,
    currentPage: 1,
    sortOption: { value: "name", text: "Pipeline Name (A-Za-z)"},
    search: "",
    activeFilters: [],
    viewType: "list",
    category: "",
    status: "",
    active: "",
  },
};

export class PipelineFilterModel extends FilterModelBase {
  constructor(getAccessToken, cancelTokenSource, loadData) {
    super(pipelineFilterMetadata);
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

  canSort = () => {
    return true;
  };

  getActiveFilters = () => {
    let activeFilters = [];

    if (this.getData("status") != null && this.getData("status") !== "") {
      activeFilters.push({filterId: "status", text: `Status: ${this.getFilterText("status")}`});
    }

    if (this.getData("active") != null && this.getData("active") !== "") {
      activeFilters.push({filterId: "active",  text: `${this.getFilterText("active")}`});
    }

    if (this.getData("tag") != null) {
      activeFilters.push({filterId: "tag", ...this.getData("tag")});
    }

    if (this.getData("owner") != null) {
      activeFilters.push({filterId: "owner", text: `Owner: ${this.getFilterText("owner")}`});
    }

    if (this.getData("search") != null && this.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${this.getData("search")}`});
    }

    return activeFilters;
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest Pipelines", value: "oldest"},
        {text: "Newest Pipelines", value: "newest"},
        {text: "Pipeline Name (A-Za-z)", value: "name"},
        {text: "Pipeline Name (z-aZ-A)", value: "name-descending"},
        {text: "Updated (Latest)", value: "lastupdated"},
        {text: "Updated (Earliest)", value: "earliest-updated"},
      ]
    );
  };
}

export default PipelineFilterModel;


