import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function SapCpqToolConfigurationSummaryPanel({ sapCpqToolConfigurationModel }) {
  if (sapCpqToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>        
        <Col lg={12}>
          <TextFieldBase dataObject={sapCpqToolConfigurationModel} fieldName={"domainName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={sapCpqToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={sapCpqToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={sapCpqToolConfigurationModel} fieldName={"environment"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

SapCpqToolConfigurationSummaryPanel.propTypes = {
  sapToolConfigurationModel: PropTypes.object,
};

export default SapCpqToolConfigurationSummaryPanel;
