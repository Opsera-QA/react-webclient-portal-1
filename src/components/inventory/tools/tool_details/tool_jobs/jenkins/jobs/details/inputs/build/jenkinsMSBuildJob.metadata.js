// TODO: Remove unnecessary fields
export const jenkinsMSBuildJobMetadata = {
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
      formText: "Can only be used on a jenkins running on a windows machine",
    },
    {
      label: "Command Line Arguments",
      id: "commandLineArgs",
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
    buildType: "msbuild",
    gradleTask: "",
    agentLabels: "",
    customMavenSettings: false,
    scriptId: "",
    developerTeamId: "",
  },
};