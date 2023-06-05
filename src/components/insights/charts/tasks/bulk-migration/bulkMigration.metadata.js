export const bulkMigrationMetadata = {
  type: "Bulk Migration Task",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Date Range",
      id: "date",
    },
    {
      label: "",
      id: "hierarchy-filters",
    },
    {
      label: "Task Id",
      id: "_id",
    },
    {
      label: "Component Type",
      id: "componentType",
    },
    {
      label: "Component Name",
      id: "componentName",
    },
    {
      label: "Task Id",
      id: "taskId",
    },
    {
      label: "Total Runs",
      id: "totalRun",
    },
    {
      label: "Task Name",
      id: "taskName",
    },
    {
      label: "Total Execution Time",
      id: "totalExecutionTime",
    },
    {
      label: "Total Execution Time",
      id: "executionTime",
    },
    {
      label: "Task Executed By",
      id: "taskExecutedByName",
    },
    {
      label: "Task Owned By",
      id: "taskOwnedByName",
    },
    {
      label: "Total Components",
      id: 'totalComponents',
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
      label: "Run Count",
      id: "runCount",
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
      label: "Recent Status",
      id: "lastRunCountAndStatus",
    },
    {
      label: "Status",
      id: "status",
    }
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];

    if (
      filterDto.getData("search") != null &&
      filterDto.getData("search") !== ""
    ) {
      activeFilters.push({
        filterId: "search",
        text: `Keywords: ${filterDto.getData("search")}`,
      });
    }

    return activeFilters;
  },
  newObjectFields: {
    tags: [],
    pageSize: 10,
    currentPage: 1,
    search: "",
    activeFilters: [],
    date: undefined,
    hierarchyFilters: {
      filter1: [],
      filter2: [],
      filter3: [],
      filter4: [],
      filter5: [],
      filter6: [],
      filter7: [],
      filter8: [],
    },
  },
};
