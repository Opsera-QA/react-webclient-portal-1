import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../common/form_fields/dto_form_fields/dto-item-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";

function KpiSummaryPanel({kpiData, setActiveTab}) {
  if (kpiData == null) {
    return <LoadingDialog size="sm"/>
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={kpiData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={kpiData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <DtoDateField dataObject={kpiData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <DtoItemField dataObject={kpiData} fieldName={"tool_identifier"}/>
        </Col>
        <Col lg={6}>
          <DtoToggleField dataObject={kpiData} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={kpiData} fieldName={"description"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

KpiSummaryPanel.propTypes = {
  kpiData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default KpiSummaryPanel;
