import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import { Col } from "react-bootstrap";

function SfdcPushArtifactsJobSummaryCard({ sfdcStepConfigurationDto }) {
  console.log({sfdcStepConfigurationDto});
  const getSummaryFields = () =>{    
    return (
      <>                
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"service"} />
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"repository"} />
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"upstreamBranch"} />
        </Col>                
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"scriptFilePath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"scriptFileName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"outputPath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"outputFileName"} />
        </Col>
      </>
    );
  };

  if (sfdcStepConfigurationDto == null) {
    return null;
  }

  return (
    <>
      {getSummaryFields()}
    </>
  );
}

SfdcPushArtifactsJobSummaryCard.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
};

export default SfdcPushArtifactsJobSummaryCard;
