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
      label: "Jenkins Job",
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
      label: "JFrog Tool",
      id: "jfrogToolConfigId",
      isRequired: true
    },
    {
      label: "Repository Configuration Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Repository Port",
      id: "port",
      regexDefinitionName: "numericalField",
    },
    {
      label : "Tool Registry Job Name",
      id: "toolJobName"
    }
  ],
  fieldsAlt: [
    {
      label: "Job Type",
      id: "jobType",
    },
    {
      label: "Jenkins Job",
      id: "jobName",
    },
    {
      label: "Jenkins Job",
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
    },
    {
      label: "Job Description",
      id: "jobDescription"
    },
    {
      label: "JFrog Tool",
      id: "jfrogToolConfigId",
      isRequired: true
    },
    {
      label: "Repository Configuration Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Repository Port",
      id: "port",
      regexDefinitionName: "numericalField",
      isRequired: true
    },
    {
      label : "Tool Registry Job",
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
    type: "REPOPATHPREFIX",
    port:"",
    repositoryName : "",
    jobDescription: ""
  }
};

export default jfrogStepFormMetadata;
