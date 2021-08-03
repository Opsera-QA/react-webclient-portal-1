const s3PipelineStepConfigurationMetadata = {
  type: "S3 Pipeline Step Configuration",
  fields: [
    {
      label: "S3 Url",
      id: "s3Url",
    },
    {
      label: "Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "Build Step Info",
      id: "buildStepId",
      isRequired: true
    },
    {
      label: "Bucket Name",
      id: "bucketName",
      isRequired: true
    },
    {
      label: "AWS Credentials",
      id: "awsToolConfigId",
      isRequired: true
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

export default s3PipelineStepConfigurationMetadata;