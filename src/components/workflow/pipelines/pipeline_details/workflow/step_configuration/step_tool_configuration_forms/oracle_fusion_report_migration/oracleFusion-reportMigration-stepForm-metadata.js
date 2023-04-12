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
      regexDefinitionName: "pathField",
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
      label: "Target Folder Path",
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
