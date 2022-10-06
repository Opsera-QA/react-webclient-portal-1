export const githubActionsUniqueRunRunsSummaryMetadata = {
  type: "Github Actions Workflow",
  fields: [
    {
      label: "Run ID",
      id: "workflowRunId",
    },
    {
      label: "Workflow Name",
      id: "workflowName",
    },
    {
      label: "Start Time",
      id: "workflowStartTime",
    },
    {
      label: "End Time",
      id: "workflowEndTime",
    },
    {
      label: "Triggered By",
      id: "triggeredBy",
    },
    {
      label: "Event",
      id: "triggerEvent",
    },
    {
      label: "Total Duration",
      id: "totalDuration",
    },
    {
      label: "Conclusion",
      id: "conclusion",
    },
    {
      label: "Number of Runs",
      id: "numberOfRuns",
    },
    {
      label: "Workflow URL",
      id: "workflowURL",
    },
  ],
  newObjectFields: {
    workflowRunId: "",
    workflowName: "",
    workflowURL: "",
    workflowStartTime: "",
    workflowEndTime: "",
    triggeredBy: "",
    triggerEvent: "",
    totalDuration: "",
    conclusion: "",
    numberOfRuns: "",
  },
};
