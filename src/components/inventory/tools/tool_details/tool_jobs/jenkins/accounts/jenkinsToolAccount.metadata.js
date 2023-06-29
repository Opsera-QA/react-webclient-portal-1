export const jenkinsToolAccountMetadata = {
  type: "Jenkins Account Credential",
  fields: [
    {
      label: "Credential Name",
      id: "credentialsId",
      isRequired: true
    },
    {
      label: "Credential Description",
      id: "credentialsDescription",
      isRequired: true
    },
    {
      label: "Tool",
      id: "toolId",
      isRequiredFunction: (model) => {
        return model?.getData("service") !== "secretFile";
      },
    },
    {
      label: "Tool User",
      id: "gitUserName",
    },
    {
      label: "Platform",
      id: "service",
      isRequired: true
    },
    {
      label: "Tool",
      id: "credentialsToolId",
    },
    {
      label: "Credential Name",
      id: "gitCredential"
    },
    {
      label: "Repository Id",
      id: "repositoryId"
    },
    {
      label: "Certificate File",
      id: "secretFile",
      formText: "Only .p12 files are supported",
      isRequiredFunction: (model) => {
        return model?.getData("service") === "secretFile";
      },
    },
    {
      label: "Password",
      id: "password",
      isRequiredFunction: (model) => {
        return model?.getData("service") === "secretFile";
      },
    },
    {
      id: "fileName",
    }
  ],
  newObjectFields: {
    credentialsId: "",
    credentialsDescription: "",
    toolId: "",
    gitUserName: "",
    service: "",
    credentialsToolId: "",
    gitCredential: "",
    repositoryId: "",
    secretFile: "",
    password: "",
    fileName: "",
  },
};

// TODO: Put this in a more fitting spot if used elsewhere
export const platformList = [
  {
    label: "GitLab",
    value: "gitlab",
  },
  {
    label: "GitHub",
    value: "github",
  },
  {
    label: "Bitbucket",
    value: "bitbucket",
  },
];
