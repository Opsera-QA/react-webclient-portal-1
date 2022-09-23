export const githubActionsWorkflowActionableInsights3Metadata = {
  type: "Github Actions Workflow",
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
      label: "Unique Workflow Name",
      id: "_id",
    },
    {
      label: "Workflow",
      id: "workflow",
    },
    {
      label: "Total Runs",
      id: "runs",
    },
    {
      label: "Total Repositories",
      id: "repos",
    },
    {
      label: "Total Success Runs",
      id: "success",
    },
    {
      label: "Total Failure Runs",
      id: "failures",
    },
    {
      label: "Total Steps",
      id: "jobs",
    },
    {
      label: "Successful Steps",
      id: "jobsSuccess",
    },
    {
      label: "Failed Steps",
      id: "jobsFailures",
    },
    {
      label: "Canceled Steps",
      id: "canceled",
    },
    {
      label: "Runs Canceled",
      id: "runsCanceled",
    },
    {
      label: "% Canceled",
      id: "canceledPercentage",
    },
    {
      label: "% Success",
      id: "successPercentage",
    },
    {
      label: "% Failures",
      id: "failedPercentage",
    },
    {
       label: "Average Time For Success",
       id: "successTime",
    },
    {
      label: "Average Time For Failures",
      id: "failedTime",
    },
    {
      label: "Repository Name",
      id: "repoName"
    },
    {
      label: "Branch Name",
      id: "branchName"
    },
    {
      label: "App Name",
      id: "appName"
    },
    {
      label: "Step Name",
      id: "jobName"
    },
    {
      label: "Steps Skipped",
      id: "skipped"
    },
    {
      label: "Runs Skipped",
      id: "runsSkipped"
    },
    {
      label: "% Run",
      id: "runPercentage"
    },
    {
      label: "% Skipped",
      id: "skippedPercentage"
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

         if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
           activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
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
    },
  },
};
