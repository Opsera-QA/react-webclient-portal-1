import React from "react";
import PropTypes from "prop-types";
import SfdcStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SfdcStepJenkinsJobSelectInput";
import SfdcPackageJobEditorPanel from "./create_package_xml_job/SfdcPackageJobConfigurationPanel";
import SfdcProfileMigrationJobEditorPanel from "./profile_migration_job/SfdcProfileMigrationJobConfigurationPanel";
import SfdcValidatePackageXmlJobEditorPanel from "./validate_package/SfdcValidatePackageConfigPanel";
import SfdcPushArtifactsJobEditorPanel from "./push_artifacts_job/SfdcPushArtifactsJobConfigurationPanel";
import SfdcDeployJobEditorPanel from "./deploy_job/SfdcDeployJobConfigurationPanel";
import SfdcUnitTestEditorPanel from "./unit_test_job/SfdcUnitTestJobConfigurationPanel";
import SfdcBackupJobEditorPanel from "./backup_job/SfdcBackupJobConfigurationPanel";
import sfdcPushArtifactsJobMetadata from "../configuration_forms/push_artifacts_job/sfdcPushArtifactsJobMetadata";
import sdfcBackupJobMetadata from "../configuration_forms/backup_job/sdfcBackupJobMetadata";
import sfdcCreatePackageXmlJobMetadata from "../configuration_forms/create_package_xml_job/sfdcCreatePackageXmlJobMetadata";
import sfdcProfileMigrationJobMetadata from "../configuration_forms/profile_migration_job/sfdcProfileMigrationJobMetadata";
import sfdcValidatePackageMetadata from "../configuration_forms/validate_package/sfdcValidatePackageMetadata";
import sfdcDeployJobMetadata from "../configuration_forms/deploy_job/sfdcDeployJobMetadata";
import sdfcUnitTestJobMetadata from "../configuration_forms/unit_test_job/sdfcUnitTestJobMetadata";

function SfdcJobConfigurationPanel({ sfdcStepConfigurationDto, setSfdcStepConfigurationDataDto, listOfSteps }) {
  const getConfigurationPanel = () => {
    switch (sfdcStepConfigurationDto.getData("jobType")) {

      case "SFDC CREATE PACKAGE XML":        
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcCreatePackageXmlJobMetadata.fields))]);
        return (
         <SfdcPackageJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSfdcStepConfigurationDataDto}  />
        );

      case "SFDC PROFILE DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcProfileMigrationJobMetadata.fields))]);
        return (
         <SfdcProfileMigrationJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSfdcStepConfigurationDataDto} />
        );

      case "SFDC VALIDATE PACKAGE XML":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcValidatePackageMetadata.fields))]);
        return (
          <SfdcValidatePackageXmlJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );

      case "SFDC BACK UP":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcBackupJobMetadata.fields))]);
        return (
          <SfdcBackupJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
        );
        
      case "SFDC DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcDeployJobMetadata.fields))]);
        return (
          <SfdcDeployJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );
         
      case "SFDC UNIT TESTING":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcUnitTestJobMetadata.fields))]);
        return (
          <SfdcUnitTestEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );
         
      case "SFDC PUSH ARTIFACTS":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcPushArtifactsJobMetadata.fields))]);
        return (
          <SfdcPushArtifactsJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );
      default:
        return <div className="text-center text-muted p-5">You must select a job type before configuring details.</div>;
    }
  };

  return (
    <div>
      <div>
        <SfdcStepJenkinsJobSelectInput
          model={sfdcStepConfigurationDto}
          setModel={setSfdcStepConfigurationDataDto}
        />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

SfdcJobConfigurationPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SfdcJobConfigurationPanel;
