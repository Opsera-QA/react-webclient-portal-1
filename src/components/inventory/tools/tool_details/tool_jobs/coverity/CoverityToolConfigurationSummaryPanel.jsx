import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function CoverityToolConfigurationSummaryPanel({ coverityToolConfigurationModel }) {
  if (coverityToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={coverityToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={coverityToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={coverityToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={coverityToolConfigurationModel} fieldName={"fileName"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={coverityToolConfigurationModel} fieldName={"license"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

CoverityToolConfigurationSummaryPanel.propTypes = {
  coverityToolConfigurationModel: PropTypes.object,
};

export default CoverityToolConfigurationSummaryPanel;
