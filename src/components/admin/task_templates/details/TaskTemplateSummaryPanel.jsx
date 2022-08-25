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
import TaskTemplateInlineRoleAccessInput
  from "components/admin/task_templates/details/inputs/TaskTemplateInlineRoleAccessInput";
import SmartIdField from "components/common/fields/text/id/SmartIdField";

export default function TaskTemplateSummaryPanel(
  { 
    templateModel,
    setTemplateModel,
    setActiveTab, 
  }) {
  if (templateModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={templateModel} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <SmartIdField model={templateModel} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={templateModel} fieldName={"identifier"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={templateModel} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={templateModel} fieldName={"createdAt"}/>
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <BooleanField dataObject={templateModel} fieldName={"readOnly"}/>*/}
        {/*</Col>*/}
        {/*<Col lg={6}>*/}
        {/*  <BooleanField dataObject={templateModel} fieldName={"singleUse"}/>*/}
        {/*</Col>*/}
        {/*<Col lg={6}>*/}
        {/*  <BooleanField dataObject={templateModel} fieldName={"publicUse"}/>*/}
        {/*</Col>*/}
        <Col lg={6}>
          <ActivityField dataObject={templateModel} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TagField dataObject={templateModel} fieldName={"tags"}/>
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <GenericItemField dataObject={templateModel} fieldName={"type"}/>*/}
        {/*</Col>*/}
        <Col lg={6}>
          <JsonField dataObject={templateModel} fieldName={"configuration"}/>
        </Col>
        <Col lg={12}>
          <TaskTemplateInlineRoleAccessInput
            templateModel={templateModel}
            setTemplateModel={setTemplateModel}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TaskTemplateSummaryPanel.propTypes = {
  templateModel: PropTypes.object,
  setActiveTab: PropTypes.func,
  setTemplateModel: PropTypes.func
};
