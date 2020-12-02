// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
const ebsStepFormMetadata = {
  type: "EBS Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "AWS Tool Configuration",
      id: "awsToolConfigId",
      isRequired: true
    },
    {
      label: "Access Key",
      id: "accessKey"
    },
    {
      label: "Docker Volume Path",
      id: "dockerVolumePath"
    },
    {
      label: "Environments",
      id: "environments"
    },
    {
      label: "Secret Key",
      id: "secretKey"
    },
    {
      label: "S3 Bucket Name",
      id: "bucketName",
      isRequired: true
    },
    {
      label: "Regions",
      id: "regions"
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
      label: "S3/ECR Step",
      id: "s3ECRStepId",
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
    },
    {
      label: "Bucket Access",
      id: "bucketAccess",
      isRequired: true
    },
    {
      label: "Route 53 Host Zone ID",
      id: "hostedZoneId",
      isRequired: true
    },
    {
      label: "Route 53 Domain Name",
      id: "domainName",
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
      s3ECRStepId: "",
      description: "",
      port: "",
      ec2KeyName: "",
      platform: "",
      dockerVolumePath: {},
      environments : {},
      bucketAccess : "",
      hostedZoneId: "",
      domainName : ""
    }
};

export default ebsStepFormMetadata;