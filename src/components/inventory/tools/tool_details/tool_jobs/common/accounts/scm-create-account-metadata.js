const scmCreateAccountMetadata = {
    type: "Account Credential",
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
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repository",
        isRequired: true,
        maxLength: 255,
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repositoryName",
        isRequired: true,
        maxLength: 255,
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repoId",
        isRequired: true,
      },
      {
        label: "Account Name",
        id: "reviewerName",
        isRequired: true,
        maxLength: 100
      },
      {
        label: "Account Type",
        id: "accountType",
        isRequired: true,        
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
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repository",
        isRequired: true,
        maxLength: 255,
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repositoryName",
        isRequired: true,
        maxLength: 255,
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repoId",
        isRequired: true,
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
    fieldsToken: [
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
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repository",
        isRequired: true,
        maxLength: 255,
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repositoryName",
        isRequired: true,
        maxLength: 255,
        regexDefinitionName: "generalTextWithSpaces",
      },
      {
        label: "Repository",
        id: "repoId",
        isRequired: true,
      },
      {
        label: "Account Name",
        id: "reviewerName",
        isRequired: true,
        maxLength: 100
      },
      {
        label: "Account Type",
        id: "accountType",
        isRequired: true,        
      },
      {
        label: "Personal Access Token",
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
    newObjectFields: {
      toolId: "",
      service: "",
      workspaceName: "",
      repository: "",
      repositoryName: "", // for UI display only
      repoId: "",
      reviewerName: "",
      accountType: "",
      accountPassword: "",
      secretPrivateKey: "",
      secretAccessTokenKey: "",
      twoFactorAuthentication: false,
    },
    scmAccountTypeArray: [
      {
        "name": "Reviewer",
        "value": "reviewer",
        "disabled": false
      },
      // {
      //   "name": "Maintainer",
      //   "value": "maintainer",
      //   "disabled": true
      // },
      // {
      //   "name": "Developer",
      //   "value": "developer",
      //   "disabled": true
      // },
    ],
  };
  
  
  export default scmCreateAccountMetadata;
  