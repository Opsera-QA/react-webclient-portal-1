const pipelineSchedulerMetadata = {
  idProperty: "_id",
  type: "Pipeline Scheduled Task",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Notes",
      id: "description",
    },
    {
      label: "Notes",
      id: "notes",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Roles",
      id: "roles",
    },
    {
      label: "Task",
      id: "task",
      isRequired: true
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Schedule",
      id: "schedule",
    },
    {
      label: "Last Run",
      id: "lastRun"
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    notes: "",
    active: true,
    roles: [],
    task: {},
    schedule: { recurring: "NONE", executionDate: new Date() },
  }
};

export default pipelineSchedulerMetadata;