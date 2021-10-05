import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import { Col } from "react-bootstrap";

function SfdcValidatePackageSummaryCard({ sfdcStepConfigurationDto }) {
  const getSummaryFields = () =>{
    
    return (
      <>                
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"sfdcToolName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"sfdcUnitTestType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} />
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

SfdcValidatePackageSummaryCard.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
};

export default SfdcValidatePackageSummaryCard;
