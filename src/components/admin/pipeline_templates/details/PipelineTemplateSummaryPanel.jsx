import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";

import JsonField from "components/common/fields/json/JsonField";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import ActivityField from "components/common/fields/boolean/ActivityField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import BooleanField from "components/common/fields/boolean/BooleanField";
import PlatformPipelineTemplateRoleAccessInput
  from "components/admin/pipeline_templates/details/inputs/PlatformPipelineTemplateRoleAccessInput";

function PipelineTemplateSummaryPanel({ templateData, setActiveTab, setTemplateData }) {
  if (templateData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={templateData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={templateData} fieldName={"_id"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={templateData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={templateData} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={templateData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={templateData} fieldName={"readOnly"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={templateData} fieldName={"singleUse"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={templateData} fieldName={"publicUse"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={templateData} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TagField dataObject={templateData} fieldName={"tags"}/>
        </Col>
        <Col lg={6}>
          <GenericItemField dataObject={templateData} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={templateData} fieldName={"plan"}/>
        </Col>
        <Col lg={12}>
          <PlatformPipelineTemplateRoleAccessInput
            model={templateData}
            setModel={setTemplateData}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineTemplateSummaryPanel.propTypes = {
  templateData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setTemplateData: PropTypes.func
};

export default PipelineTemplateSummaryPanel;
