import React from "react";
import PropTypes from "prop-types";
import SfdcPackageJobSummaryCard from "./create_package_xml_job/SfdcPackageJobSummaryCard";
import SfdcBackupJobSummaryCard from "./backup_job/SfdcBackupJobSummaryCard";
import SfdcDeployJobSummaryCard from "./deploy_job/SfdcDeployJobSummaryCard";
import SfdcProfileMigrationJobSummaryCard from "./profile_migration_job/SfdcProfileMigrationJobSummaryCard";
import SfdcPushArtifactsJobSummaryCard from "./push_artifacts_job/SfdcPushArtifactsJobSummaryCard";
import SfdcUnitTestJobSummaryCard from "./unit_test_job/SfdcUnitTestJobSummaryCard";
import SfdcValidatePackageSummaryCard from "./validate_package/SfdcValidatePackageSummaryCard";
import sdfcBackupJobMetadata from "../configuration_forms/backup_job/sdfcBackupJobMetadata";
import sfdcCreatePackageXmlJobMetadata from "../configuration_forms/create_package_xml_job/sfdcCreatePackageXmlJobMetadata";
import sfdcProfileMigrationJobMetadata from "../configuration_forms/profile_migration_job/sfdcProfileMigrationJobMetadata";
import sfdcValidatePackageMetadata from "../configuration_forms/validate_package/sfdcValidatePackageMetadata";
import sfdcDeployJobMetadata from "../configuration_forms/deploy_job/sfdcDeployJobMetadata";
import sdfcUnitTestJobMetadata from "../configuration_forms/unit_test_job/sdfcUnitTestJobMetadata";
import sfdcPushArtifactsJobMetadata from "../configuration_forms/push_artifacts_job/sfdcPushArtifactsJobMetadata";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import { Col } from "react-bootstrap";

function SfdcJobSummaryCardContainer({ children, isLoading, sfdcStepConfigurationDto }) {

  const getJobSummaryPanel = () => {
    
    switch (sfdcStepConfigurationDto.getData("jobType")) {

      case "SFDC CREATE PACKAGE XML":        
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcCreatePackageXmlJobMetadata.fields))]);
        return (
         <SfdcPackageJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
        );

      case "SFDC PROFILE DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcProfileMigrationJobMetadata.fields))]);
        return (
         <SfdcProfileMigrationJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
        );

      case "SFDC VALIDATE PACKAGE XML":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcValidatePackageMetadata.fields))]);
        return (
          <SfdcValidatePackageSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
         );

      case "SFDC BACK UP":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcBackupJobMetadata.fields))]);
        return (
          <SfdcBackupJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
        );
        
      case "SFDC DEPLOY":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcDeployJobMetadata.fields))]);
        return (
          <SfdcDeployJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
         );
         
      case "SFDC UNIT TESTING":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sdfcUnitTestJobMetadata.fields))]);
        return (
          <SfdcUnitTestJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
         );
         
      case "SFDC PUSH ARTIFACTS":
        sfdcStepConfigurationDto.setMetaDataFields([...new Set(sfdcStepConfigurationDto.getFields().concat(sfdcPushArtifactsJobMetadata.fields))]);
        return (
          <SfdcPushArtifactsJobSummaryCard sfdcStepConfigurationDto={sfdcStepConfigurationDto} />
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

SfdcJobSummaryCardContainer.propTypes = {
  children: PropTypes.any,
  sfdcStepConfigurationDto: PropTypes.object,
  isLoading: PropTypes.bool
};

export default SfdcJobSummaryCardContainer;
