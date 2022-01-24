import {SONAR_JOB_TYPES} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepJobTypeSelectInput";

const sonarPipelineStepMetadata = {
  type: "Sonar Pipeline Step Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Job Type",
      id: "jobType",
      isRequired: true,
    },
    {
      label: "Job Type",
      id: "job_type",
      isRequired: true,
    },{
      label: "Project Key",
      id: "projectKey",
      maxLength: 150,
      spacesAllowed: false,
      isRequiredFunction: (model) => {
        return model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB;
      },
    },
    {
      label: "Job Name",
      id: "jobName",
      maxLength: 150,
      isRequiredFunction: (model) => {
        return model?.getData("job_type") === SONAR_JOB_TYPES.CUSTOM_JOB;
      },
    },
    {
      label: "Job",
      id: "toolJobId",
      isRequiredFunction: (model) => {
        return model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB;
      },
    },
    {
      label: "Sonar Credentials",
      id: "sonarToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB;
      },
    },
    {
      label: "Account",
      id: "gitCredential",
      isRequiredFunction: (model) => {
        return (
          model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB
          && model?.getData("isScanArtifact") !== true
        );
      },
    },
    {
      label: "Workspace",
      id: "workspace",
      isRequiredFunction: (model) => {
        return (
          model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB
          && model?.getData("service") === "bitbucket"
          && model?.getData("isScanArtifact") !== true
        );
      },
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      isRequiredFunction: (model) => {
        return (
          model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB
          && model?.getData("service") === "bitbucket"
          && model?.getData("isScanArtifact") !== true
        );
      },
    },{
      label: "Delete Jenkins workspace before building",
      id: "workspaceDeleteFlag",
    },
    {
      label: "Repository",
      id: "repository",
      isRequiredFunction: (model) => {
        return (
          model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB
          && model?.getData("isScanArtifact") !== true
        );
      },
    },
    {
      label: "Branch",
      id: "branch",
      isRequiredFunction: (model) => {
        return (
          model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB
          && model?.getData("isScanArtifact") !== true
        );
      },
    },
    {
      label: "Sonar Source Path",
      id: "sonarSourcePath",
    },
    {
      label: "Success Threshold",
      id: "successThreshold",
    },
    {
      label: "Limit Scan to Selected Artifacts",
      id: "isScanArtifact",
      formText: "By default, scan the entire branch with SonarQube. If enabled, only the selected artifact components will be scanned based on the build step selected."
    },
    {
      label: "Build Step",
      id: "stepIdXml",
      isRequiredFunction: (model) => {
        return (
          model?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB
          && model?.getData("isScanArtifact") === true
        );
      },
    },
  ],
  newObjectFields: {
    jobType: "",
    toolConfigId: "",
    jenkinsUrl: "",
    jenkinsPort: "",
    jUserId: "",
    jAuthToken: "",
    jobName: "",
    toolJobId: "",
    toolJobType: "",
    projectKey: "",
    accountUsername: "",
    projectId: "",
    defaultBranch: "",
    dockerName: "",
    dockerTagName: "",
    buildType: "gradle",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    gitUserName: "",
    repository: "",
    branch: "",
    sonarSourcePath: "",
    workspace: "",
    workspaceName: "",
    sonarToolConfigId: "",
    workspaceDeleteFlag: false,
    jobDescription: "",
    job_type: "",
    gitBranch: "",
    successThreshold: "",
    isScanArtifact: false,
    stepIdXml: "",
  }
};

export default sonarPipelineStepMetadata;