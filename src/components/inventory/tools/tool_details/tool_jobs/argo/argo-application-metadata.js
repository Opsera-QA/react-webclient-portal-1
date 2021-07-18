import regexHelpers from "utils/regexHelpers";

const argoApplicationsMetadata = {
  type: "Argo Application",
  fields: [
    {
      label: "Name",
      id: "applicationName",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Application Name can only be lowercase letters with no spaces.",
      maxLength: 63
    },
    {
      label: "Cluster",
      id: "cluster",
      isRequired: true
    },
    {
      label: "Git Path",
      id: "gitPath",
      isRequired: true,
      regexValidator: regexHelpers.regexTypes.pathField,
      maxLength: 256
    },
    {
      label: "Git URL",
      id: "gitUrl",
      isRequired: true,
      maxLength: 256,
    },
    {
      label: "Namespace",
      id: "namespace",
      isRequired: true,
      maxLength: 28,
      // regexValidator: regexHelpers.regexTypes.generalText,
    },
    {
      label: "Project Name",
      id: "projectName",
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
      regexValidator: regexHelpers.regexTypes.generalText,
    }
  ],
  newObjectFields: {
    _id: "",
    applicationName: "",
    cluster: "",
    gitPath: "",
    gitUrl: "",
    namespace: "",
    projectName: "",
    branchName: "",
    active: true,
  }
};

export default argoApplicationsMetadata;