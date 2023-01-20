import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function FortifyToolConfigurationSummaryPanel({ fortifyToolConfigurationModel }) {
  if (fortifyToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={fortifyToolConfigurationModel} fieldName={"scanToolType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyToolConfigurationModel} fieldName={"url"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyToolConfigurationModel} fieldName={"tenantCode"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyToolConfigurationModel} fieldName={"fortifyScanCenterControllerUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyToolConfigurationModel} fieldName={"fortifySscUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyToolConfigurationModel} fieldName={"userName"} />
        </Col>        
      </Row>
    </SummaryPanelContainer>
  );
}

FortifyToolConfigurationSummaryPanel.propTypes = {
  fortifyToolConfigurationModel: PropTypes.object,
};

export default FortifyToolConfigurationSummaryPanel;
