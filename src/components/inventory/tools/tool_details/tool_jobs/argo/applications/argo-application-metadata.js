import {ARGO_APPLICATION_TYPE_CONSTANTS} from "./argo-application-type-constants";

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
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Recursive Directory",
      id: "recursive",
    },
    {
      label: "Value Files",
      id: "valueFiles",
      isRequiredFunction: (model) => {
        return (
          model?.getData("type") === ARGO_APPLICATION_TYPE_CONSTANTS.TYPE.HELM)
            && (!model?.getData("values"));
      },
    },
    {
      label: "Values",
      id: "values",
      isValidFunction: (value) => {
        try {
          const json = JSON.parse(value);
          return (typeof json === 'object');
        } catch (e) {
          return false;
        }
      },
      isRequiredFunction: (model) => {
        return (
          model?.getData("type") === ARGO_APPLICATION_TYPE_CONSTANTS.TYPE.HELM)
            && (!model?.getData("valueFiles"));
      },
    },
    {
      label: "Prefix Name",
      id: "namePrefix",
    },
    {
      label: "Suffix Name",
      id: "nameSuffix",
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