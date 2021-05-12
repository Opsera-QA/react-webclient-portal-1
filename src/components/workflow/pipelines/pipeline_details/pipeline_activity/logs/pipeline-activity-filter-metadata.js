const pipelineActivityFilterMetadata = {
  idProperty: "_id",
  type: "Pipeline Activity",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tool Identifier",
      id: "tool",
    },
    {
      label: "Hide Status Check Logs",
      id: "hide_status",
    },
    {
      label: "Show Latest Run",
      id: "latest",
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
      label: "Pipeline Owner",
      id: "owner"
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
      label: "View Type",
      id: "viewType",
    },
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];

    // if (filterDto.getData("tool") != null) {
    //   activeFilters.push({filterId: "tool", ...filterDto.getData("tool")});
    // }

    if (filterDto.getData("run") != null && filterDto.getData("run") > 0) {
      activeFilters.push({filterId: "run", text: `Run: ${filterDto.getData("run")}` });
    }

    if (filterDto.getData("hide_status") === false) {
      activeFilters.push({filterId: "hide_status", text: `Hide Status Check Logs: ${filterDto.getData("hide_status")}`});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keyword: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 250,
    currentPage: 1,
    sortOption: {},
    search: "",
    hide_status: true,
    latest: false,
    tool: "",
    // step_id: "",
    run: 0,
    activeFilters: []
  },
};

export default pipelineActivityFilterMetadata;