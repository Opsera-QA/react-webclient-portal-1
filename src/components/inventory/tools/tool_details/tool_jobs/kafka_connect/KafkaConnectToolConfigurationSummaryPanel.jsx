import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function KafkaConnectToolConfigurationSummaryPanel({ kafkaConnectToolConfigurationModel }) {
  if (kafkaConnectToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={kafkaConnectToolConfigurationModel} fieldName={"username"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={kafkaConnectToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={kafkaConnectToolConfigurationModel} fieldName={"password"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

KafkaConnectToolConfigurationSummaryPanel.propTypes = {
  kafkaConnectToolConfigurationModel: PropTypes.object,
};

export default KafkaConnectToolConfigurationSummaryPanel;
