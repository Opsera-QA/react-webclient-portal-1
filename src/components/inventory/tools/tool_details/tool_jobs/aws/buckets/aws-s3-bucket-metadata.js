const awsS3BucketMetadata = {
  type: "AWS S3 Bucket",
  fields: [
    {
      label: "S3 Bucket Name",
      id: "bucketName",
      isRequired: true,
      regexDefinitionName: "azureLabels",
      maxLength: 100
    },
    {
      label: "Bucket Version",
      id: "bucketVersion",
      isRequired: true,
    },
    {
      label: "Region",
      id: "regions",
      isRequired: true,
    },
    {
      label: "Block Public Acls",
      id: "blockPublicAcls",
    },
    {
      label: "Block Public Policy",
      id: "blockPublicPolicy",
    },
    {
      label: "Ignore Public Acls",
      id: "ignorePublicAcls",
    },
    {
      label: "Restrict Public Buckets",
      id: "restrictPublicBuckets",
    },
  ],
  newObjectFields: {
    bucketName: "",
    bucketVersion: "",
    regions: "",
    blockPublicAcls: true,
    blockPublicPolicy: true,
    ignorePublicAcls: true,
    restrictPublicBuckets: true,
  }
};

export default awsS3BucketMetadata;
