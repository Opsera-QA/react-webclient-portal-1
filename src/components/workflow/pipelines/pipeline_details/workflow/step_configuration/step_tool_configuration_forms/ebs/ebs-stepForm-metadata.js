// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
const ebsStepFormMetadata = {
  type: "EBS Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "AWS Tool Config ID",
      id: "awsToolConfigId",
      isRequired: true
    },
    {
      label: "Access Key",
      id: "accessKey",
      isRequired: true
    },
    {
      label: "Docker Volume Path",
      id: "dockerVolumePath",
      isRequired: true
    },
    {
      label: "Environments",
      id: "environments",
      isRequired: true
    },
    {
      label: "Secret Key",
      id: "secretKey",
      isRequired: true
    },
    {
      label: "S3 Bucket Name",
      id: "bucketName",
      isRequired: true
    },
    {
      label: "Regions",
      id: "regions",
      isRequired: true
    },
    {
      label: "Application Name",
      id: "applicationName",
      isRequired: true
    },
    {
      label: "Application Version",
      id: "applicationVersionLabel",
      isRequired: true
    },
    {
      label: "S3 Step",
      id: "s3StepId",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
      isRequired: true
    },
    {
      label: "EC2 Key Name",
      id: "ec2KeyName",
      isRequired: true
    },
    {
      label: "Application Port",
      id: "port",
      isRequired: true
    },
    {
      label: "Platform",
      id: "platform",
      isRequired: true
    }
  ],
  newModelBase:
    {
      awsToolConfigId: "",
      accessKey: "",
      secretKey: "",
      bucketName: "",
      regions: "",
      applicationName: "",
      applicationVersionLabel: "",
      s3StepId: "",
      description: "",
      port: "",
      ec2KeyName: "",
      platform: "",
      dockerVolumePath: "",
      environments : ""
    }
};

export default ebsStepFormMetadata;