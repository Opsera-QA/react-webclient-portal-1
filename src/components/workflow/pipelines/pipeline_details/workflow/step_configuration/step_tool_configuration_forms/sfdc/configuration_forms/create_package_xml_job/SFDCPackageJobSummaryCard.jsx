import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import { Col } from "react-bootstrap";

function SFDCPackageJobSummaryCard({ sfdcStepConfigurationDto }) {
  const getSummaryFields = () =>{    
    return (
      <>        
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"sfdcToolName"} />
        </Col>        
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
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"branch"} />
        </Col>
      </>
    );
  };

  return (
    <>
      {sfdcStepConfigurationDto && getSummaryFields()}      
    </>
  );
}

SFDCPackageJobSummaryCard.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
};

export default SFDCPackageJobSummaryCard;
