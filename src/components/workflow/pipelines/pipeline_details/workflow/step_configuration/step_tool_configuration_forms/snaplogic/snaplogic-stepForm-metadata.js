import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const SnaplogicStepFormMetadata = {
  type: "Snaplogic Step Configuration",
  fields: [
    {
      label: "Snaplogic Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "SCM Service",
      id: "service",
      isRequired: true
    },
    {
      label: "Repository",
      id: "gitRepository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true
    },    
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequired: true
    },
    {
      label: "Snaplogic Project Space",
      id: "projectSpace",
      isRequired: true
    },
    {
      label: "Snaplogic Project",
      id: "project",
      isRequired: true
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    gitToolId: "",
    service: "",
    gitRepository: "",    
    repoId: "",
    gitBranch: "",
    projectSpace: "",
    project: "",
  }
};

export default SnaplogicStepFormMetadata;
