import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import VaultField from "components/common/fields/text/VaultField";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function SfdcToolConfigurationSummaryPanel({ sfdcToolConfigurationModel }) {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  const getDynamicFields = () => {
    if (isOpseraAdministrator === true) {
      return (
        <>
          <Col lg={12}>
            <TextFieldBase dataObject={sfdcToolConfigurationModel} fieldName={"buildType"} />
          </Col>
          <Col lg={12}>
            <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_client_id"} />
          </Col>
          <Col lg={12}>
            <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_client_secret"} />
          </Col>
          <Col lg={12}>
            <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_token"} />
          </Col>
          <Col lg={12}>
            <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_password"} />
          </Col>
        </>
      );
    }
  };

  if (sfdcToolConfigurationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col lg={12}>
        <TextFieldBase dataObject={sfdcToolConfigurationModel} fieldName={"accountUsername"} />
      </Col>
      <Col lg={12}>
        <TextFieldBase dataObject={sfdcToolConfigurationModel} fieldName={"toolURL"} />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

SfdcToolConfigurationSummaryPanel.propTypes = {
  sfdcToolConfigurationModel: PropTypes.object,
};
