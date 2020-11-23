import React, {useContext} from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";

import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoJsonField from "../../../common/form_fields/dto_form_fields/dto-json-field";
import DtoItemField from "../../../common/form_fields/dto_form_fields/dto-item-field";
import DtoTagField from "../../../common/form_fields/dto_form_fields/dto-tag-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import BooleanField from "../../../common/form_fields/dto_form_fields/BooleanField";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";

function TemplateSummaryPanel({ templateData, setActiveTab }) {

  if (templateData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={templateData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={templateData} fieldName={"_id"}/>
        </Col>
        <Col lg={12}>
          <DtoTextField dataObject={templateData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={templateData} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <DtoDateField dataObject={templateData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={templateData} fieldName={"readOnly"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={templateData} fieldName={"singleUse"}/>
        </Col>
        <Col lg={6}>
          <DtoToggleField dataObject={templateData} fieldName={"active"}/>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <DtoTagField dataObject={templateData} fieldName={"tags"}/>
        </Col>
        <Col lg={4}>
          <DtoItemField dataObject={templateData} fieldName={"type"}/>
        </Col>
        <Col lg={4}>
          <DtoItemField dataObject={templateData} fieldName={"roles"}/>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <DtoJsonField dataObject={templateData} fieldName={"plan"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TemplateSummaryPanel.propTypes = {
  templateData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default TemplateSummaryPanel;
