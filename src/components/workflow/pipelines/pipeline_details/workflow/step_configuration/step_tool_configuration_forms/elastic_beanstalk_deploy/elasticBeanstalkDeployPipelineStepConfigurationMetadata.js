const elasticBeanstalkDeployPipelineStepConfigurationMetadata = {
  type: "Elastic Beanstalk Deploy Pipeline Step Configuration",
  fields: [
    {
      label: "AWS Credentials",
      id: "awsToolConfigId",
      isRequired: true
    },
    {
      label: "S3 Bucket Name",
      id: "bucketName",
      isRequired: true,
      maxLength: 150
    },
    {
      label: "EC2 Key Name",
      id: "ec2KeyName",
      isRequired: true,
      maxLength: 50,
      formText: "Key-pair file name used to access the EC2 instance."
    },
    {
      label: "Application Port",
      id: "port",
      isRequired: true,
      maxLength: 10,
      formText: "Port that the application needs in order to run."
    },
    {
      label: "Platform",
      id: "platform",
      isRequired: true,
    },
    {
      label: "Application Name",
      id: "applicationName",
      maxLength: 250,
    },
    {
      label: "Description",
      id: "description",
      maxLength: 250,
    },
    {
      label: "Application Version",
      id: "applicationVersionLabel",
      maxLength: 50,
    },
    {
      label: "S3 Step Info",
      id: "s3StepId",
    },
    {
      label: "AWS Regions",
      id: "regions",
    },
  ],
  newObjectFields: {
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
    platform: ""
  }
};

export default elasticBeanstalkDeployPipelineStepConfigurationMetadata;