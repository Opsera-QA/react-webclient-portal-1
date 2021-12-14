export const s3PipelineStepConfigurationMetadata = {
  type: "S3 Pipeline Step Configuration",
  fields: [
    {
      label: "AWS Tool",
      id: "awsToolConfigId",
      isRequired: true,
    },
    {
      label: "S3 Url",
      id: "s3Url",
    },
    {
      label: "Job Type",
      id: "jobType",
    },
    {
      label: "Build Step Info",
      id: "buildStepId",
      isRequired: true,
    },
    {
      label: "Regions",
      id: "regions",
      isRequired: true,
    },
    {
      label: "Bucket Name",
      id: "bucketName",
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