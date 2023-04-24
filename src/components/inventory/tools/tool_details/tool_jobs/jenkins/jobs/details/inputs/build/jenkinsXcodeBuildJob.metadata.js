// TODO: Remove unnecessary fields
export const jenkinsXcodeBuildJobMetadata = {
  type: "Jenkins Build Job",
  fields: [
    {
      label: "Build Type",
      id: "buildType",
      isRequired: true,
    },
    {
      label: "Gradle Task",
      id: "gradleTask",
    },
    {
      label: "Maven Task",
      id: "mavenTask",
    },
    {
      label: "Agent Label",
      id: "agentLabels",
    },
    {
      label: "Command Line Arguments",
      id: "commandLineArgs",
      formText: "Currently, only .Net and Coverity Scan supports windows agent",
    },
    {
      label: "Build Step",
      id: "jobType",
    },
    {
      label: "Use Custom Maven Settings",
      id: "customMavenSettings"
    },
    {
      label: "Custom Plist",
      id: "scriptId",
      isRequiredFunction: (model) => {
        return model?.getData("customMavenSettings") === true;
      },
    },
    {
      label: "Developer Team",
      id: "developerTeamId"
    },
  ],
  newObjectFields: {
    commandLineArgs: "",
    mavenTask: "",
    buildType: "",
    gradleTask: "",
    agentLabels: "",
    customMavenSettings: false,
    scriptId: "",
    developerTeamId: "",
  },
};

