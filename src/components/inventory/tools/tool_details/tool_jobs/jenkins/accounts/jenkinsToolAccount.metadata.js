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
      isRequired: true
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
      label: "Repository Id",
      id: "repositoryId"
    },
    {
      label: "Credential Name",
      id: "gitCredential"
    },
  ],
  newObjectFields: {
    credentialsId: "",
    credentialsToolId: "",
    repositoryId: "",
    credentialsDescription: "",
    toolId: "",
    gitUserName: "",
    service: "",
    credentailsToolId: "",
    gitCredential: "",
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
