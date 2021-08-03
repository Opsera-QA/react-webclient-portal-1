const jfrogStepFormMetadata = {
  type: "JFrog Artifactory Docker Tool Configuration",
  fields: [
    {
      label: "Job Type",
      id: "jobType",
    },
    {
      label: "Jenkins Job",
      id: "jobName",
    },
    {
      label: "Jenkins Job ID",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: "Job Type",
      id: "toolJobType",
    },
    {
      label: "Build Step",
      id: "buildStepId",
      isRequired: true
    },
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Repository Name",
      id: "repositoryName",
      isRequired: true
    },
    {
      label: "Job Description",
      id: "jobDescription"
    },
    {
      label: "Step Tool",
      id: "jfrogToolConfigId",
      isRequired: true
    },
    {
      label : "Tool Registry Job Name",
      id: "toolJobName"
    }
  ],
  newObjectFields: {
    jobType: "",
    jobName: "",
    toolJobId: "",
    toolJobType: "",
    buildStepId: "",
    toolJobName: "",
    toolConfigId: "",
    jfrogToolConfigId: "",
    repositoryName : "",
    jobDescription: ""
  }
};

export default jfrogStepFormMetadata;
