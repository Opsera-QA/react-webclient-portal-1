
const awsS3BucketMetadata = {
    type: "AWS S3 Bucket",
    fields: [
      {
        label: "S3 Bucket Name",
        id: "bucketName",
        isRequired: true,
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
        isRequired: true,
      },
      {
        label: "Block Public Policy",
        id: "blockPublicPolicy",
        isRequired: true,
      },
      {
        label: "Ignore Public Acls",
        id: "ignorePublicAcls",
        isRequired: true,
      },
      {
        label: "Restrict Public Buckets",
        id: "restrictPublicBuckets",
        isRequired: true,
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
