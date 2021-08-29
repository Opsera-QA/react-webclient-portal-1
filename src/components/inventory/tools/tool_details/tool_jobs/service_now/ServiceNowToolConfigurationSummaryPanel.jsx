import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function ServiceNowToolConfigurationSummaryPanel({ serviceNowToolConfigurationModel }) {
  if (serviceNowToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={serviceNowToolConfigurationModel} fieldName={"userName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={serviceNowToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={serviceNowToolConfigurationModel} fieldName={"secretKey"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ServiceNowToolConfigurationSummaryPanel.propTypes = {
  serviceNowToolConfigurationModel: PropTypes.object,
};

export default ServiceNowToolConfigurationSummaryPanel;
