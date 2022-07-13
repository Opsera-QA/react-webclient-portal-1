import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function InformaticaIdqToolConfigurationSummaryPanel({ informaticaIdqToolConfigurationModel }) {
  if (informaticaIdqToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={informaticaIdqToolConfigurationModel} fieldName={"domainName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={informaticaIdqToolConfigurationModel} fieldName={"domainGateway"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={informaticaIdqToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={informaticaIdqToolConfigurationModel} fieldName={"securityGroup"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={informaticaIdqToolConfigurationModel} fieldName={"repositoryService"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={informaticaIdqToolConfigurationModel} fieldName={"dataIntegrationServer"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

InformaticaIdqToolConfigurationSummaryPanel.propTypes = {
  informaticaIdqToolConfigurationModel: PropTypes.object,
};

export default InformaticaIdqToolConfigurationSummaryPanel;
