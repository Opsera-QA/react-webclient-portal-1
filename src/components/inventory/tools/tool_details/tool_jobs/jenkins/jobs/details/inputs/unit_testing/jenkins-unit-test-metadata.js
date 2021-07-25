const JenkinsUnitTestJobMetadata = {
    type: "Jenkins Unit Test Job",
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
    ],
    newObjectFields: {
      jobType: "",
      gradleTask:"",
      mavenTask:"",
    },
  };
  
  export default JenkinsUnitTestJobMetadata;
  