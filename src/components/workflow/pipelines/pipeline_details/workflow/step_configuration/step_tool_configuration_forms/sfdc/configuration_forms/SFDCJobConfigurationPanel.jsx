import React from "react";
import PropTypes from "prop-types";
import SFDCJenkinsJobInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SFDCJenkinsJobInput";
import SFDCPackageJobEditorPanel from "./create_package_xml_job/SFDCPackageJobConfigurationPanel";
import SFDCDependencyTypeInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SFDCDependencyTypeInput";
import SFDCProfileMigrationJobEditorPanel from "./profile_migration_job/SFDCProfileMigrationJobConfigurationPanel";
import SFDCValidatePackageXMLJobEditorPanel from "./validate_package_xml_job/SFDCValidatePackageXMLJobConfigurationPanel";
import SFDCPushArtifactsJobEditorPanel from "./push_artifacts_job/SFDCPushArtifactsJobConfigurationPanel";
import SFDCDeployJobEditorPanel from "./deploy_job/SFDCDeployJobConfigurationPanel";
import SFDCUnitTestEditorPanel from "./unit_test_job/SFDCUnitTestJobConfigurationPanel";
import SFDCBackupJobEditorPanel from "./backup_job/SFDCBackupJobConfigurationPanel";
import sfdcPushArtifactsJobMetadata from "../configuration_forms/push_artifacts_job/sfdcPushArtifactsJobMetadata";
import sdfcBackupJobMetadata from "../configuration_forms/backup_job/sdfcBackupJobMetadata";
import sfdcCreatePackageXmlJobMetadata from "../configuration_forms/create_package_xml_job/sfdcCreatePackageXmlJobMetadata";
import sfdcProfileMigrationJobMetadata from "../configuration_forms/profile_migration_job/sfdcProfileMigrationJobMetadata";
import sfdcValidatePackageXmlJobMetadata from "../configuration_forms/validate_package_xml_job/sfdcValidatePackageXmlJobMetadata";
import sfdcDeployJobMetadata from "../configuration_forms/deploy_job/sfdcDeployJobMetadata";
import sdfcUnitTestJobMetadata from "../configuration_forms/unit_test_job/sdfcUnitTestJobMetadata";

function SFDCJobConfigurationPanel({ sfdcStepConfigurationDto, setSFDCStepConfigurationDataDto, listOfSteps }) {
  const getConfigurationPanel = () => {
    switch (sfdcStepConfigurationDto.getData("jobType")) {

      case "SFDC CREATE PACKAGE XML":        
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcCreatePackageXmlJobMetadata.fields))]);
        return (
         <SFDCPackageJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSFDCStepConfigurationDataDto={setSFDCStepConfigurationDataDto}  />
        );

      case "SFDC PROFILE DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcProfileMigrationJobMetadata.fields))]);
        return (
         <SFDCProfileMigrationJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSFDCStepConfigurationDataDto={setSFDCStepConfigurationDataDto} />
        );

      case "SFDC VALIDATE PACKAGE XML":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcValidatePackageXmlJobMetadata.fields))]);
        return (
          <SFDCValidatePackageXMLJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSFDCStepConfigurationDataDto={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );

      case "SFDC BACK UP":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcBackupJobMetadata.fields))]);
        return (
          <SFDCBackupJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSFDCStepConfigurationDataDto={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
        );
        
      case "SFDC DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcDeployJobMetadata.fields))]);
        return (
          <SFDCDeployJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSFDCStepConfigurationDataDto={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );
         
      case "SFDC UNIT TESTING":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcUnitTestJobMetadata.fields))]);
        return (
          <SFDCUnitTestEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSFDCStepConfigurationDataDto={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );
         
      case "SFDC PUSH ARTIFACTS":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcPushArtifactsJobMetadata.fields))]);
        return (
          <SFDCPushArtifactsJobEditorPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSFDCStepConfigurationDataDto={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
         );
      default:
        return <div className="text-center text-muted p-5">You must select a job type before configuring details.</div>;
    }
  };

  return (
    <div>
      <div>
        <SFDCJenkinsJobInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

SFDCJobConfigurationPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSFDCStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SFDCJobConfigurationPanel;
