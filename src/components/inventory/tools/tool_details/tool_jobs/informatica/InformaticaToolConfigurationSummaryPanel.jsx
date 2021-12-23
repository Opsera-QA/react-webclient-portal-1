import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function InformaticaToolConfigurationSummaryPanel({ informaticaToolConfigurationModel }) {
  if (informaticaToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={informaticaToolConfigurationModel} fieldName={"regions"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={informaticaToolConfigurationModel} fieldName={"username"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={informaticaToolConfigurationModel} fieldName={"password"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

InformaticaToolConfigurationSummaryPanel.propTypes = {
  informaticaToolConfigurationModel: PropTypes.object,
};

export default InformaticaToolConfigurationSummaryPanel;
