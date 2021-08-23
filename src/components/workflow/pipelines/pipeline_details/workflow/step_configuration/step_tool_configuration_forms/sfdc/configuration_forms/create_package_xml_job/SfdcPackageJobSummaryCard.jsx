import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import { Col } from "react-bootstrap";

function SfdcPackageJobSummaryCard({ sfdcStepConfigurationDto }) {
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

  if (sfdcStepConfigurationDto == null) {
    return null;
  }

  return (
    <>
      {getSummaryFields()}
    </>
  );
}

SfdcPackageJobSummaryCard.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
};

export default SfdcPackageJobSummaryCard;
