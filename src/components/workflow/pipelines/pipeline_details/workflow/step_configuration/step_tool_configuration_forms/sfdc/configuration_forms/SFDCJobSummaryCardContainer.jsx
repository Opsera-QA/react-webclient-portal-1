import React from "react";
import PropTypes from "prop-types";
import SFDCPackageJobSummaryCard from "./create_package_xml_job/SFDCPackageJobSummaryCard";
import SFDCBackupJobSummaryCard from "./backup_job/SFDCBackupJobSummaryCard";
import SFDCDeployJobSummaryCard from "./deploy_job/SFDCDeployJobSummaryCard";
import SFDCProfileMigrationJobSummaryCard from "./profile_migration_job/SFDCProfileMigrationJobSummaryCard";
import SFDCPushArtifactsJobSummaryCard from "./push_artifacts_job/SFDCPushArtifactsJobSummaryCard";
import SFDCUnitTestJobSummaryCard from "./unit_test_job/SFDCUnitTestJobSummaryCard";
import SFDCValidatePackageXMLJobSummaryCard from "./validate_package_xml_job/SFDCValidatePackageXMLJobSummaryCard";
import sdfcBackupJobMetadata from "../configuration_forms/backup_job/sdfcBackupJobMetadata";
import sfdcCreatePackageXmlJobMetadata from "../configuration_forms/create_package_xml_job/sfdcCreatePackageXmlJobMetadata";
import sfdcProfileMigrationJobMetadata from "../configuration_forms/profile_migration_job/sfdcProfileMigrationJobMetadata";
import sfdcValidatePackageXmlJobMetadata from "../configuration_forms/validate_package_xml_job/sfdcValidatePackageXmlJobMetadata";
import sfdcDeployJobMetadata from "../configuration_forms/deploy_job/sfdcDeployJobMetadata";
import sdfcUnitTestJobMetadata from "../configuration_forms/unit_test_job/sdfcUnitTestJobMetadata";
import sfdcPushArtifactsJobMetadata from "../configuration_forms/push_artifacts_job/sfdcPushArtifactsJobMetadata";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import { Col } from "react-bootstrap";

function SFDCJobSummaryCardContainer({ children, isLoading, sfdcStepConfigurationDto }) {

  const getJobSummaryPanel = () => {
    
    switch (sfdcStepConfigurationDto.getData("jobType")) {

      case "SFDC CREATE PACKAGE XML":        
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcCreatePackageXmlJobMetadata.fields))]);
        return (
         <SFDCPackageJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
        );

      case "SFDC PROFILE DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcProfileMigrationJobMetadata.fields))]);
        return (
         <SFDCProfileMigrationJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
        );

      case "SFDC VALIDATE PACKAGE XML":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcValidatePackageXmlJobMetadata.fields))]);
        return (
          <SFDCValidatePackageXMLJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
         );

      case "SFDC BACK UP":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcBackupJobMetadata.fields))]);
        return (
          <SFDCBackupJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
        );
        
      case "SFDC DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcDeployJobMetadata.fields))]);
        return (
          <SFDCDeployJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
         );
         
      case "SFDC UNIT TESTING":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcUnitTestJobMetadata.fields))]);
        return (
          <SFDCUnitTestJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
         );
         
      case "SFDC PUSH ARTIFACTS":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcPushArtifactsJobMetadata.fields))]);
        return (
          <SFDCPushArtifactsJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
         );

      default:
        return <></>;
    }
  };

  return (
    <>
      <Col lg={6}>
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"toolConfigId"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"jobType"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"jobName"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"toolJobId"} />
      </Col>
      {sfdcStepConfigurationDto && getJobSummaryPanel()}
    </>
  );
}

SFDCJobSummaryCardContainer.propTypes = {
  children: PropTypes.any,
  sfdcStepConfigurationDto: PropTypes.object,
  isLoading: PropTypes.bool
};

export default SFDCJobSummaryCardContainer;
