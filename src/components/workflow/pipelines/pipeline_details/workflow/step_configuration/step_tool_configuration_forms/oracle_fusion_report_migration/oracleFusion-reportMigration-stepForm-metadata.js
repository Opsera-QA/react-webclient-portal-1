const OracleFusionReportMigrationStepFormMetadata = {
  type: "Oracle Fusion Report Migration Step Configuration",
  fields: [
    {
      label: "Migration Type",
      id: "migrationType",
      isRequired: true
    },
    {
      label: "Source Instance Tool ID",
      id: "sourceInstanceToolId",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "instance_to_instance";
      },
    },    
    {
      label: "Source Instance Folder Path",
      id: "sourceInstancePath",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "instance_to_instance";
      },
      regexDefinitionName: "pathField",
      maxLength: 1024,
    },
    {
      label: "Source Instance Reports",
      id: "sourceInstanceReports",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "instance_to_instance";
      },
    },
    {
      label: "Target Instance Tool ID",
      id: "targetInstanceToolId",
      isRequired: true,
    },
    {
      label: "Target Instance Folder Path",
      id: "targetInstancePath",
      isRequired: true,
      regexDefinitionName: "pathField",
      maxLength: 1024,
    },
    {
      label: "Artifact Step ID",
      id: "artifactStepId",
      isRequiredFunction: (model) => {
        return model?.getData("migrationType") === "artifactory_to_instance";
      },
    },
  ],
  newObjectFields: {
    migrationType: "",
    sourceInstanceToolId: "",    
    sourceInstancePath: "",
    sourceInstanceReports: "",
    targetInstanceToolId: "",
    targetInstancePath: "",
    artifactStepId: "",    
  }
};

export default OracleFusionReportMigrationStepFormMetadata;
