export const s3PipelineStepConfigurationMetadata = {
  type: "S3 Pipeline Step Configuration",
  fields: [
    {
      label: "AWS Tool",
      id: "awsToolConfigId",
      isRequired: true,
    },
    {
      label: "Bucket Name",
      id: "bucketName",
      isRequired: true,
      maxLength: 150,
    },
    {
      label: "S3 Url",
      id: "s3Url",
      maxLength: 150,
    },
    {
      label: "Job Type",
      id: "jobType",
    },
    {
      label: "Build Step",
      id: "buildStepId",
      isRequired: true,
    },
    {
      label: "Bucket Access Level",
      id: "bucketAccess",
      isRequired: true,
    },
    {
      label: "Regions",
      id: "regions",
      isRequired: true,
    },
  ],
  newObjectFields: {
    jobType: "SEND S3",
    awsToolConfigId: "",
    buildStepId: "",
    bucketName: "",
    bucketAccess: "private",
    s3Url: "",
  }
};