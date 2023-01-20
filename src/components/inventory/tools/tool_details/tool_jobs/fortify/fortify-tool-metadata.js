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
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On Demand";
      },
      isSecureUrl: true,
    },
    {
      label: "Tenant Code",
      id: "tenantCode",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On Demand";
      },
      regexDefinitionName: "generalTextWithoutSpacesPeriod",
      maxLength: 100,
    },
    {
      label: "Access Key",
      id: "accessKey",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On Demand";
      },
      maxLength: 256
    },
    {
      label: "Secret Key",
      id: "secretKey",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On Demand";
      },
      maxLength: 256
    },
    {
      label: "Scan Center Controller URL",
      id: "fortifyScanCenterControllerUrl",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On-Prem ScanCentral";
      },
      isSecureUrl: true,
    },    
    {
      label: "Scan Center Controller Client Token",
      id: "token",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On-Prem ScanCentral";
      },
      maxLength: 1024
    },
    {
      label: "Software Security Center URL",
      id: "fortifySscUrl",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On-Prem ScanCentral";
      },
      isSecureUrl: true,
    },
    {
      label: "Software Security Center Username",
      id: "userName",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On-Prem ScanCentral";
      },
      maxLength: 2048,
    },
    {
      label: "Software Security Center Password",
      id: "password",
      isRequiredFunction: (model) => {
        return model?.getData("scanToolType") === "Fortify On-Prem ScanCentral";
      },
      maxLength: 2048,
    },
  ],
  newObjectFields:
  {
    scanToolType: "",    
    url: "",
    tenantCode: "",
    accessKey: "",
    secretKey: "",
    fortifyScanCenterControllerUrl: "",
    token: "",
    fortifySscUrl: "",
    userName: "",
    password: "",
  }
};

export default FortifyMetadata;
