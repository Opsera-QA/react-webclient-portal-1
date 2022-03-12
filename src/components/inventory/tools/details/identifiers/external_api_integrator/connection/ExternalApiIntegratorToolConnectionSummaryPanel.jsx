import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function ExternalApiIntegratorToolConnectionSummaryPanel({ externalApiIntegratorModel }) {
  if (externalApiIntegratorModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={externalApiIntegratorModel} fieldName={"connection_check_url"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ExternalApiIntegratorToolConnectionSummaryPanel.propTypes = {
  externalApiIntegratorModel: PropTypes.object,
};

export default ExternalApiIntegratorToolConnectionSummaryPanel;
