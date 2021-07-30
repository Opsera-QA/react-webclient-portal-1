export const JenkinsJobTypeMeta = {
  BUILD: {
    type: "BUILD",
    fields: [
      { label: "Build Type", id: "buildType" },
      { label: "Docker Name", id: "dockerName" },
      { label: "Docker Tag Name", id: "dockerTagName" },
      { label: "Gradle Task", id: "gradleTask" },
      { label: "Maven Task", id: "mavenTask" },
      { label: "Command Line Args", id: "commandLineArgs" },
    ],
    newModelBase: {
      buildType: "",
      dockerName: "",
      dockerTagName: "",
      gradleTask: "",
      mavenTask: "",
      commandLineArgs: "",
    },
  },
  "SHELL SCRIPT": {
    type: "SHELL SCRIPT",
    fields: [
      { label: "Build Type", id: "buildType" },
      { label: "Docker Name", id: "dockerName" },
      { label: "Docker Tag Name", id: "dockerTagName" },
      { label: "Gradle Task", id: "gradleTask" },
      { label: "Maven Task", id: "mavenTask" },
      { label: "Command Line Args", id: "commandLineArgs" },
    ],
    newModelBase: {
      buildType: "",
      dockerName: "",
      dockerTagName: "",
      gradleTask: "",
      mavenTask: "",
      commandLineArgs: "",
    },
  },
  "UNIT TESTING": {
    type: "UNIT TESTING",
    fields: [
      { label: "Build Type", id: "buildType" },
      { label: "Docker Name", id: "dockerName" },
      { label: "Docker Tag Name", id: "dockerTagName" },
      { label: "Gradle Task", id: "gradleTask" },
      { label: "Maven Task", id: "mavenTask" },
      { label: "Command Line Args", id: "commandLineArgs" },
    ],
    newModelBase: {
      buildType: "",
      dockerName: "",
      dockerTagName: "",
      gradleTask: "",
      mavenTask: "",
      commandLineArgs: "",
    },
  },
  "FUNCTIONAL TESTING": {
    type: "FUNCTIONAL TESTING",
    fields: [
      { label: "Build Type", id: "buildType" },
      { label: "Docker Name", id: "dockerName" },
      { label: "Docker Tag Name", id: "dockerTagName" },
      { label: "Gradle Task", id: "gradleTask" },
      { label: "Maven Task", id: "mavenTask" },
      { label: "Command Line Args", id: "commandLineArgs" },
    ],
    newModelBase: {
      buildType: "",
      dockerName: "",
      dockerTagName: "",
      gradleTask: "",
      mavenTask: "",
      commandLineArgs: "",
    },
  },
  "DOCKER PUSH": {
    type: "DOCKER PUSH",
    fields: [
      { label: "Build Type", id: "buildType" },
    ],
    newModelBase: {
      buildType: "",
      dockerName: "",
      dockerTagName: "",
      gradleTask: "",
      mavenTask: "",
      commandLineArgs: "",
    },
  },
  ARTIFACTORY_DOCKER_PUSH: {
    type: "DOCKER PUSH",
    fields: [{ label: "Build Type", id: "buildType" }],
    newModelBase: {
      buildArgs: "",
      buildType: "",
    },
  },
  SFDC: {
    type: "DOCKER PUSH",
    fields: [{ label: "Build Type", id: "buildType" }],
    newModelBase: {
      buildType: "",
    },
  },
};
