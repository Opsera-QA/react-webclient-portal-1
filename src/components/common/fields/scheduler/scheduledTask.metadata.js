export const scheduledTaskMetadata = {
  idProperty: "_id",
  type: "Scheduled Task",
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
      label: "Interval",
      id: "schedule.recurring",
    },
    {
      label: "Next Run",
      id: "schedule.executionDate",
      mustBeInTheFuture: true
    },
    {
      label: "Last Run",
      id: "lastRun"
    },

    {
      label: "S3 Tool",
      id: "s3ToolId"      
    },
    {
      label: "Backup Interval",
      id: "task.pushToS3Interval"
    },
    {
      label: "File Name",
      id: "task.s3FileName"
    },
    {
      label: "Path",
      id: "task.pushToS3Path"
    },
    {
      label: "Region",
      id: "task.region"
    },
    {
      label: "AWS Bucket Name",
      id: "task.awsBucketName"
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