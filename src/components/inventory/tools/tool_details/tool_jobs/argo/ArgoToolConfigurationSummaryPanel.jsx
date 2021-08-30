import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function ArgoToolConfigurationSummaryPanel({ argoToolConfigurationModel }) {
  if (argoToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={argoToolConfigurationModel} fieldName={"userName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={argoToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={argoToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ArgoToolConfigurationSummaryPanel.propTypes = {
  argoToolConfigurationModel: PropTypes.object,
};

export default ArgoToolConfigurationSummaryPanel;
