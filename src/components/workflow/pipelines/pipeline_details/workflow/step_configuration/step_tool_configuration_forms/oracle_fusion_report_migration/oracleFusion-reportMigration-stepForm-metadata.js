import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const OracleFusionReportMigrationStepFormMetadata = {
  type: "Oracle Fusion Report Migration Step Configuration",
  fields: [
    {
      label: "Migration Type",
      id: "migrationType",
      isRequired: true
    },
    {
      label: "Source Tool ID",
      id: "sourceInstanceToolId",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "instance_to_instance";
      },
    },    
    {
      label: "Source Folder",
      id: "sourceInstancePath",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "instance_to_instance";
      },
      regexDefinitionName: "fusionPathField",
      maxLength: 1024,
    },
    {
      label: "Source Reports",
      id: "sourceInstanceReports",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "instance_to_instance";
      },
    },
    {
      label: "Target Tool ID",
      id: "targetInstanceToolId",
      isRequired: true,
    },
    {
      label: "Target Folder",
      id: "targetInstancePath",
      regexDefinitionName: "fusionPathField",
      maxLength: 1024,
    },
    {
      label: "Artifact Step ID",
      id: "artifactStepId",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "artifactory_to_instance";
      },
    },
    {
      label: "Source Code Management Type",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "pull_reports";
      },
    },
    {
      label: "Source Code Management Tool",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "pull_reports";
      },
    },
    {
      label: "Repository",
      id: "repository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "pull_reports";
      },
    },    
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "pull_reports";
      },
    },
    {
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "pull_reports";
      },
    },
    {
      id: "sshUrl"
    },
    {
      id: "gitUrl"
    },
    {
      label: "GIT Commit Id",
      id: "gitCommitId",      
    },
    {
      label: "Nexus Tool",
      id: "nexusToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "push_reports";
      },
    },
    {
      label: "Group Name",
      id: "groupName",
      regexDefinitionName: "generalText",
      maxLength: 50,
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "push_reports";
      },
    },
    {
      id: "repositoryGroup",
    },
    {
      label: "Repository",
      id: "repositoryName",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "push_reports";
      },
    },
  ],
  newObjectFields: {
    migrationType: "",
    sourceInstanceToolId: "",    
    sourceInstancePath: "",
    sourceInstanceReports: [],
    targetInstanceToolId: "",
    targetInstancePath: "",
    artifactStepId: "",
    service: "github",
    repoId: "",
    repository: "",
    gitBranch: "",
    sshUrl: "",    
    gitUrl: "",
    gitCommitId: "",
    nexusToolConfigId: "",
    groupName: "",
    repositoryGroup : "maven2",
    repositoryName: "",
  }
};

export default OracleFusionReportMigrationStepFormMetadata;
