const pipelineSchedulerMetadata = {
  idProperty: "_id",
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
      id: "execution",
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    active: true,
    roles: [],
    task: {},
    executionDate: new Date()
  }
};

export default pipelineSchedulerMetadata;