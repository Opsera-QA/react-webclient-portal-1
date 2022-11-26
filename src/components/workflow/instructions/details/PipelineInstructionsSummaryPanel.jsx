import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import OwnerNameField from "components/common/fields/text/general/OwnerNameField";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import RichTextField from "components/common/fields/rich_text/RichTextField";
import PipelineInstructionsTypeField
  from "components/common/list_of_values_input/settings/pipelines/instructions/type/PipelineInstructionsTypeField";
import PipelineInstructionsRoleAccessInlineInput
  from "components/workflow/instructions/details/inputs/PipelineInstructionsRoleAccessInlineInput";
import PipelineInstructionsAttributesSummaryPanel
  from "components/workflow/instructions/details/PipelineInstructionsAttributesSummaryPanel";

export default function PipelineInstructionsSummaryPanel(
  {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    setActiveTab,
    loadDataFunction,
  } ) {
  if (pipelineInstructionsModel == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase
            className={"mb-2"}
            dataObject={pipelineInstructionsModel}
            fieldName={"name"}
          />
        </Col>
        <Col lg={6}>
          <OwnerNameField
            className={"mb-2"}
            model={pipelineInstructionsModel}
          />
        </Col>
        <Col lg={12}>
          <PipelineInstructionsRoleAccessInlineInput
            pipelineInstructionsModel={pipelineInstructionsModel}
            setPipelineInstructionsModel={setPipelineInstructionsModel}
          />
        </Col>
        <Col lg={6}>
          <PipelineInstructionsTypeField
            model={pipelineInstructionsModel}
          />
        </Col>
        <Col xs={12}>
          <RichTextField
            fieldName={"instructions"}
            model={pipelineInstructionsModel}
            minimumHeight={"150px"}
            maximumHeight={"1000px"}
          />
        </Col>
        <Col lg={12}>
          <TextFieldBase
            fieldName={"description"}
            dataObject={pipelineInstructionsModel}
          />
        </Col>
        <PipelineInstructionsAttributesSummaryPanel
          attributes={pipelineInstructionsModel?.getData("attributes")}
          tags={pipelineInstructionsModel?.getData("tags")}
        />
        <Col lg={12}>
          <TagField
            dataObject={pipelineInstructionsModel}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineInstructionsSummaryPanel.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
  setPipelineInstructionsModel: PropTypes.func,
  setActiveTab: PropTypes.func,
  loadDataFunction: PropTypes.func,
};
