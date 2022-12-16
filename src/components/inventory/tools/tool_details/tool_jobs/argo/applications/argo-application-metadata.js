const argoApplicationsMetadata = {
  type: "Argo Application",
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Application Name cannot contain spaces.",
      maxLength: 63
    },
    {
      label: "Cluster",
      id: "clusterUrl",
      isRequired: true
    },
    {
      label: "Cluster Name",
      id: "clusterName",
    },
    {
      label: "Path",
      id: "path",
      isRequired: true,
      regexDefinitionName: "pathField",
      maxLength: 256
    },
    {
      label: "Created At",
      id: "creationTimestamp",
    },
    {
      label: "Health",
      id: "healthStatus",
    },
    {
      label: "Sync",
      id: "syncStatus",
    },
    {
      label: "Project Name",
      id: "project",
      isRequired: true
    },
    {
      label: "Branch Name",
      id: "branch",
      isRequired: true,
      maxLength: 28,
      regexDefinitionName: "generalText",
    },
    {
      label: "Git URL",
      id: "repoUrl",
      isRequired: true,
      maxLength: 256,
    },
    // NEWLY ADDED FIELDS ARE ABOVE.. TODO TO BE REVISITED AND REMOVE UNUSED
    // {
    //   label: "Name",
    //   id: "applicationName",
    //   isRequired: true,
    //   lowercase: true,
    //   spacesAllowed: false,
    //   formText: "Application Name cannot contain spaces.",
    //   maxLength: 63
    // },
    // {
    //   label: "Cluster",
    //   id: "cluster",
    //   isRequired: true
    // },
    // {
    //   label: "Git Path",
    //   id: "gitPath",
    //   isRequired: true,
    //   regexDefinitionName: "pathField",
    //   maxLength: 256
    // },
    // {
    //   label: "Git URL",
    //   id: "gitUrl",
    //   isRequired: true,
    //   maxLength: 256,
    // },
    {
      label: "Namespace",
      id: "namespace",
      isRequired: true,
      maxLength: 28,
      regexDefinitionName: "domainField",
    },
    // {
    //   label: "Project Name",
    //   id: "projectName",
    //   isRequired: true
    // },
    {
      label: "Active",
      id: "active",
    },
    // {
    //   label: "Branch Name",
    //   id: "branchName",
    //   isRequired: true,
    //   maxLength: 28,
    //   regexDefinitionName: "generalText",
    // },
    {
      label: "Auto Sync",
      id: "autoSync",
    }
  ],
  newObjectFields: {
    _id: "",
    applicationName: "",
    project: "",
    branch:"",
    clusterUrl:"",
    path:"",
    cluster: "",
    gitPath: "",
    gitUrl: "",
    namespace: "",
    projectName: "",
    branchName: "",
    active: true,
    autoSync: false
  }
};

export default argoApplicationsMetadata;