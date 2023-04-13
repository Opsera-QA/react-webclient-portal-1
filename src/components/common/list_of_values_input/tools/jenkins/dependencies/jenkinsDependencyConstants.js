export const getJenkinsDependencies = (buildType) => {
  switch (buildType) {
    case "node":
      return nodeDependencies;
    case "gradle":
      return gradleDependencies;
    default:
      return jenkinsDependencies;
  }
};

const nodeDependencies = [
  {
    name: "Node Version 16.19",
    dependencyType: "nodejs",
    version: "16.19",
  },
  {
    name: "Node Version 17.1",
    dependencyType: "nodejs",
    version: "17.1",
  },
  {
    name: "Node Version 18.12",
    dependencyType: "nodejs",
    version: "18.12",
  },
  {
    name: "Node Version 19.3",
    dependencyType: "nodejs",
    version: "19.3",
  },
];

const gradleDependencies = [
  {
    name: "Java openJDK Version 7",
    dependencyType: "java",
    version: "7",
  },
  {
    name: "Java openJDK Version 8",
    dependencyType: "java",
    version: "8",
  },
  {
    name: "Java openJDK Version 9",
    dependencyType: "java",
    version: "9",
  },
  {
    name: "Java openJDK Version 10",
    dependencyType: "java",
    version: "10",
  },
  {
    name: "Java openJDK Version 11",
    dependencyType: "java",
    version: "11",
  },
  {
    name: "Gradle 6.x",
    dependencyType: "gradle",
    version: "Gradle 6.x",
  },
  {
    name: "Gradle 7.x",
    dependencyType: "gradle",
    version: "Gradle 7.x",
  },
  {
    name: "Gradle 8.x",
    dependencyType: "gradle",
    version: "Gradle 8.x",
  },
];

const jenkinsDependencies = [
  {
    name: "Java openJDK Version 7",
    dependencyType: "java",
    version: "7",
  },
  {
    name: "Java openJDK Version 8",
    dependencyType: "java",
    version: "8",
  },
  {
    name: "Java openJDK Version 9",
    dependencyType: "java",
    version: "9",
  },
  {
    name: "Java openJDK Version 10",
    dependencyType: "java",
    version: "10",
  },
  {
    name: "Java openJDK Version 11",
    dependencyType: "java",
    version: "11",
  },
  {
    name: "Maven Version 3.0.5",
    dependencyType: "maven",
    version: "3.0.5",
  },
  {
    name: "Maven Version 3.1.1",
    dependencyType: "maven",
    version: "3.1.1",
  },
  {
    name: "Maven Version 3.2.5",
    dependencyType: "maven",
    version: "3.2.5",
  },
  {
    name: "Maven Version 3.3.9",
    dependencyType: "maven",
    version: "3.3.9",
  },
  {
    name: "Maven Version 3.5.0",
    dependencyType: "maven",
    version: "3.5.0",
  },
  {
    name: "Maven Version 3.5.2",
    dependencyType: "maven",
    version: "3.5.2",
  },
  {
    name: "Maven Version 3.5.3",
    dependencyType: "maven",
    version: "3.5.3",
  },
  {
    name: "Maven Version 3.5.4",
    dependencyType: "maven",
    version: "3.5.4",
  },
  {
    name: "Maven Version 3.6.0",
    dependencyType: "maven",
    version: "3.6.0",
  },
  {
    name: "Maven Version 3.6.1",
    dependencyType: "maven",
    version: "3.6.1",
  },
  {
    name: "Maven Version 3.6.2",
    dependencyType: "maven",
    version: "3.6.2",
  },
  {
    name: "Maven Version 3.6.3",
    dependencyType: "maven",
    version: "3.6.3",
  },
  {
    name: "Maven Version 3.8.2",
    dependencyType: "maven",
    version: "3.8.2",
  },
];