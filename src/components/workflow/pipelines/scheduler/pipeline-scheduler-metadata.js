const pipelineSchedulerMetadata = {
  idProperty: "_id",
  type: "Pipeline Scheduled Task",
  // detailView: function(record) {
  //   return `/inventory/tools/details/${record.getData("_id")}`;
  // },
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
      label: "Description",
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
      label: "Execution Date",
      id: "schedule.executionDate",
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    notes: "",
    active: true,
    roles: [],
    task: {},
    schedule: { recurring: "NONE", executionDate: "" },
  }
};

export default pipelineSchedulerMetadata;