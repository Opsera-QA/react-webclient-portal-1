import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function AwsToolConfigurationSummaryPanel({ awsToolConfigurationModel }) {
  if (awsToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={awsToolConfigurationModel} fieldName={"regions"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={awsToolConfigurationModel} fieldName={"accessKey"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={awsToolConfigurationModel} fieldName={"secretKey"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={awsToolConfigurationModel} fieldName={"awsAccountId"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

AwsToolConfigurationSummaryPanel.propTypes = {
  awsToolConfigurationModel: PropTypes.object,
};

export default AwsToolConfigurationSummaryPanel;
