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
      isRequired: true
    },
    {
      label: "Owner",
      id: "owner",
      isRequired: true
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
      isRequired: true
    },
    {
      label: "Schedule",
      id: "schedule",
      isRequired: true
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    notes: "",
    active: true,
    roles: [],
    task: {},
    schedule: { recurring: "ONCE", executionDate: new Date() },
  }
};

export default pipelineSchedulerMetadata;