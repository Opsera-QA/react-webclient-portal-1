import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function ApigeeToolConnectionSummaryPanel({ apigeeConfigurationModel }) {
  if (apigeeConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={apigeeConfigurationModel} fieldName={"version"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={apigeeConfigurationModel} fieldName={"zone"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={apigeeConfigurationModel} fieldName={"userName"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={apigeeConfigurationModel} fieldName={"password"} />
        </Col>                
      </Row>
    </SummaryPanelContainer>
  );
}

ApigeeToolConnectionSummaryPanel.propTypes = {
  apigeeConfigurationModel: PropTypes.object,
};

export default ApigeeToolConnectionSummaryPanel;
