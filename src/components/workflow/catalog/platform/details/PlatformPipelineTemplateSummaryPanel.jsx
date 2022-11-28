import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import JsonField from "components/common/fields/json/JsonField";
import PipelineTemplateRoleAccessInput
  from "components/admin/pipeline_templates/details/inputs/PipelineTemplateRoleAccessInput";

export default function PlatformPipelineTemplateSummaryPanel(
  {
    pipelineTemplateModel,
    setPipelineTemplateModel,
  }) {
  if (pipelineTemplateModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer>
      <Row className={"m-2"}>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineTemplateModel} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineTemplateModel} fieldName={"_id"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={pipelineTemplateModel} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineTemplateModel} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={pipelineTemplateModel} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={pipelineTemplateModel} fieldName={"readOnly"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={pipelineTemplateModel} fieldName={"singleUse"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={pipelineTemplateModel} fieldName={"publicUse"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={pipelineTemplateModel} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TagField dataObject={pipelineTemplateModel} fieldName={"tags"}/>
        </Col>
        <Col lg={6}>
          <GenericItemField dataObject={pipelineTemplateModel} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={pipelineTemplateModel} fieldName={"plan"}/>
        </Col>
        <Col lg={12}>
          <PipelineTemplateRoleAccessInput
            disabled={true}
            dataObject={pipelineTemplateModel}
            setDataObject={setPipelineTemplateModel}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PlatformPipelineTemplateSummaryPanel.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  setPipelineTemplateModel: PropTypes.func,
};