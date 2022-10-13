const FortifyMetadata = {
  type: "Fortify Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Scan Tool",
      id: "scanToolType",
      isRequired: true,
    },
    {
      label: "Portal URL",
      id: "url",
      isRequired: true,
    },
    {
      label: "Tenant Code",
      id: "tenantCode",
      isRequired: true,
      regexDefinitionName: "generalTextWithoutSpacesPeriod",
      maxLength: 100,
    },
    {
      label: "Access Key",
      id: "accessKey",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Secret Key",
      id: "secretKey",
      isRequired: true,
      maxLength: 256
    },
  ],
  newObjectFields:
  {
    scanToolType: "",    
    url: "",
    tenantCode: "",
    accessKey: "",
    secretKey: "",
  }
};

export default FortifyMetadata;
