import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function BoomiToolConfigurationSummaryPanel({ boomiToolConfigurationModel }) {
  if (boomiToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={boomiToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={boomiToolConfigurationModel} fieldName={"accountId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={boomiToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={boomiToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={boomiToolConfigurationModel} fieldName={"apiType"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

BoomiToolConfigurationSummaryPanel.propTypes = {
  boomiToolConfigurationModel: PropTypes.object,
};

export default BoomiToolConfigurationSummaryPanel;
