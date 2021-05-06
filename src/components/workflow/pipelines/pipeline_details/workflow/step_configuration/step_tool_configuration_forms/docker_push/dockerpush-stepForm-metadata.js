import regexHelpers from "utils/regexHelpers";

const dockerPushStepFormMetadata = {
    type: "Docker Push Tool Configuration",
    fields: [
      {
        label: "Jenkins Tool",
        id: "toolConfigId",
        isRequired: true
      },
      {
        label: "Jenkins Tool Name",
        id: "toolName",
        isRequired: true
      },
      {
        label: "Jenkins Job",
        id: "toolJobName",
        isRequired: true
      },
      
      {
        label: "Job Name",
        id: "jobName",
      },
      {
        label: "Job",
        id: "toolJobId",
        isRequired: true
      },
      {
        label: "Job Type",
        id: "toolJobType",
        // isRequired: true
      },
      {
        label: "Job Type",
        id: "jobType",
        isRequired: true
      },
      {
        label: "Dependency",
        id: "dependencyType",
        // isRequired: true
      },
      {
        id: "dependencies",
        // isRequired: true
      },
      {
        label: "Jenkins Agent",
        id: "agentLabels",
        // isRequired: true
      },
      {
        label: "Auto-Scaling Enabled?",
        id: "autoScaleEnable"
      },
      {
        label: "AWS Credentials",
        id: "awsToolConfigId",
        isRequired: true
      },
      {
        label: "Build Step Info",
        id: "buildStepId",
        isRequired: true
      },
      {
        label: "Want to use an existing repository?",
        id: "newRepo",
      },
      {
        label: "ECR Repository",
        id: "ecrRepoName",
        isRequired: true.valueOf,
        regexValidator: regexHelpers.regexTypes.ecrRepoField,
        maxLength: 200,
        minLength: 2,
        fieldText: "The name must start and end with a letter and can only contain lowercase letters, numbers, hyphens, underscores, and forward slashes."
      }
    ],
    newModelBase: {
      type: "",
      jobType: "", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
      toolConfigId: "",
      toolName: "",
      jobName: "",
      toolJobId: "",
      buildType: "", //hardcoded now but needs to get it from a dropdown
      awsToolConfigId: "",
      agentLabels: "",
      autoScaleEnable: false,
      newRepo: false,
      ecrRepoName: "",
      dependencies: {},
      dependencyType:"",
      buildStepId: "",
    }
  };
  
  export default dockerPushStepFormMetadata;