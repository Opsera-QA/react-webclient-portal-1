const teamcityStepConfigurationMetadata = {
  type: "Team City Step Configuration",
  fields: [
    {
      label: "TeamCity URL",
      id: "teamcityApiURL",
      maxLength: 100,
      isRequired: true
    },
    // {
    //   label: "Jenkins User ID",
    //   id: "jUserId",
    //   isRequired: true
    // },
    {
      label: "TeamCity Username",
      id: "teamcityUsername",
      maxLength: 100,
      isRequired: true
    },
    {
      label: "TeamCity Password",
      id: "teamcityPassword",
      maxLength: 100,
      isRequired: true
    },
    {
      label: "Build Configuration ID",
      id: "teamcityBuildTypeId",
      isRequired: true,
      maxLength: 150,
    },
    {
      label: "Project ID",
      id: "teamcityProjectId",
      isRequired: true,
      maxLength: 150,
    },
  ],
  newObjectFields: {
    teamcityApiURL: "",
    teamcityBuildTypeId: "",
    teamcityProjectId: "",
    teamcityUsername: "",
    teamcityPassword: ""
  }
};

export default teamcityStepConfigurationMetadata;