const awsConnectionMetadata = {
  type: "AWS Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "AWS Access Key ID",
      id: "accessKey",
      maxLength: 256,
      isRequired: true
    },
    {
      label: "AWS Secret Access Key",
      id: "secretKey",
      maxLength: 256,
      isRequired: true
    },
    {
      label: "AWS Region",
      id: "regions",
      maxLength: 150,
      isRequired: true
    },
    {
      label: "AWS Account ID",
      id: "awsAccountId",
      regexDefinitionName: "numericalField",
      maxLength: 12,
      isRequired: true,
      isVaultField: true,
    },
  ],
  newObjectFields:
    {
      accessKey: "",
      secretKey: "",
      regions: "",
      awsAccountId: "",
    }
};

export default awsConnectionMetadata;