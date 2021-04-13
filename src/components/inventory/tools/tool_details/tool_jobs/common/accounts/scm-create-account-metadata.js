import regexHelpers from "utils/regexHelpers";

const scmCreateAccountMetadata = {
    type: "SCM Account Credential",
    fields: [      
      {
        label: "Tool",
        id: "toolId",
        isRequired: true
      },
      {
        label: "Platform",
        id: "service",
        isRequired: true
      },
      {
        label: "Workspace/Project",
        id: "workspaceName",
        maxLength: 255,
        regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
      },
      {
        label: "Repository",
        id: "repository",
        isRequired: true,
        maxLength: 255,
        regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
      },
      {
        label: "Name",
        id: "reviewerName",
        isRequired: true,
        maxLength: 100
      },
      {
        label: "Password",
        id: "accountPassword",
        isRequired: true,
        maxLength: 256
      },
      {
        label: "Private Key",
        id: "secretPrivateKey",
      },
      {
        label: "Access Key",
        id: "secretAccessTokenKey",
      },
      {
        label: "Enable Two-Factor Authentication",
        id: "twoFactorAuthentication",
      },
    ],
    fieldsAlt: [
      {
        label: "Tool",
        id: "toolId",
        isRequired: true
      },
      {
        label: "Platform",
        id: "service",
        isRequired: true
      },
      {
        label: "Workspace/Project",
        id: "workspaceName",
        maxLength: 255,
        regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
      },
      {
        label: "Repository",
        id: "repository",
        isRequired: true,
        maxLength: 255,
        regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
      },
      {
        label: "Username",
        id: "accountUsername",
        isRequired: true,
        maxLength: 100
      },
      {
        label: "Password",
        id: "accountPassword",        
        maxLength: 256
      },
      {
        label: "Private Key",
        id: "secretPrivateKey",
        isRequired: true,
      },
      {
        label: "Access Key",
        id: "secretAccessTokenKey",
        isRequired: true,
      },
      {
        label: "Enable Two-Factor Authentication",
        id: "twoFactorAuthentication",
      },
    ],
    newModelBase: {
      toolId: "",
      service: "",
      workspaceName: "",
      repository: "",
      reviewerName: "",
      accountPassword: "",
      secretPrivateKey: "",
      secretAccessTokenKey: "",
      twoFactorAuthentication: false,
    },
  };
  
  
  export default scmCreateAccountMetadata;
  