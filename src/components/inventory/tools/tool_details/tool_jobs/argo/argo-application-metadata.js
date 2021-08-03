
// TODO: Shrey, this might need to be completely different or there might need to be multiple sets of metadata.
// If you need help wiring anything up, please message me.
const argoApplicationsMetadata = {
  type: "Argo Application",
  fields: [
    {
      label: "Name",
      id: "applicationName",
      isRequired: true
    },
    {
      label: "Cluster",
      id: "cluster",
      isRequired: true
    },
    {
      label: "Git Path",
      id: "gitPath",
      isRequired: true
    },
    {
      label: "Git URL",
      id: "gitUrl",
      isRequired: true
    },
    {
      label: "Namespace",
      id: "namespace",
      isRequired: true,
      maxLength: 28,
      // regexDefinitionName: "generalText",
    },
    {
      label: "Project Name",
      id: "projectName",
      isRequired: true
    },
    {
      label: "toolId",
      id: "toolId",
      isRequired: true
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Branch Name",
      id: "branchName",
      isRequired: true,
      maxLength: 28,
      regexDefinitionName: "generalText",
    }
],
  newObjectFields: {
    applicationName : "",
    cluster : "",
    gitPath : "",
    gitUrl : "",
    namespace : "",
    projectName : "",
    toolId : "",
    branchName: "",
    active: true,
  }
};

export default argoApplicationsMetadata;