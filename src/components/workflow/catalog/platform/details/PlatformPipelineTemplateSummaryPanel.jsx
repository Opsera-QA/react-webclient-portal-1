import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import PlatformPipelineTemplateRoleAccessInput
from "components/admin/pipeline_templates/details/inputs/PlatformPipelineTemplateRoleAccessInput";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CreatePlatformPipelineButton from "temp-library-components/cards/templates/pipelines/platform/deploy/CreatePlatformPipelineButton";
import PrimaryPipelineTypeField
from "components/common/list_of_values_input/admin/pipeline_templates/PrimaryPipelineTypeField";

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
      <Row className={"mt-2"}>
        <Col lg={6}>
          <TextFieldBase
            dataObject={pipelineTemplateModel}
            fieldName={"name"}
          />
        </Col>
        <Col lg={6}>
          <SmartIdField
            model={pipelineTemplateModel}
            showDetailLinkClipboardIcon={false}
          />
        </Col>
        <Col lg={12}>
          <TextFieldBase
            dataObject={pipelineTemplateModel}
            fieldName={"description"}
          />
        </Col>
        <Col lg={6}>
          <DateFieldBase
            dataObject={pipelineTemplateModel}
            fieldName={"createdAt"}
          />
        </Col>
        <Col lg={6}>
          <DateFieldBase
            dataObject={pipelineTemplateModel}
            fieldName={"updatedAt"}
          />
        </Col>
        <Col lg={6}>
          <PrimaryPipelineTypeField
            model={pipelineTemplateModel}
            fieldName={"type"}
          />
        </Col>
        <Col lg={12}>
          <PlatformPipelineTemplateRoleAccessInput
            disabled={true}
            model={pipelineTemplateModel}
            setModel={setPipelineTemplateModel}
          />
        </Col>
        <Col lg={12}>
          <TagField
            dataObject={pipelineTemplateModel}
            fieldName={"tags"}
          />
        </Col>
        <Col lg={12}>
          <ButtonContainerBase>
            <CreatePlatformPipelineButton
              platformPipelineTemplateModel={pipelineTemplateModel}
            />
          </ButtonContainerBase>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PlatformPipelineTemplateSummaryPanel.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  setPipelineTemplateModel: PropTypes.func,
};