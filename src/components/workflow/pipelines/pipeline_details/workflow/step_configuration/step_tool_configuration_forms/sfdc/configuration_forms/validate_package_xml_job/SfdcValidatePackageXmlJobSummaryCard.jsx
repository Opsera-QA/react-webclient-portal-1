import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import { Col } from "react-bootstrap";

function SfdcValidatePackageXmlJobSummaryCard({ sfdcStepConfigurationDto }) {
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

SfdcValidatePackageXmlJobSummaryCard.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
};

export default SfdcValidatePackageXmlJobSummaryCard;
