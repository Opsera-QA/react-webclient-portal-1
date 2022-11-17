import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import RichTextInput from "components/common/inputs/rich_text/RichTextInput";
import PipelineInstructionsTypeSelectInput
  from "components/common/list_of_values_input/settings/pipelines/instructions/type/PipelineInstructionsTypeSelectInput";
import PipelineInstructionsAttributesEditorPanel
  from "components/workflow/instructions/details/PipelineInstructionsAttributesEditorPanel";

export default function PipelineInstructionsEditorPanel(
  {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    handleClose,
    viewDetailsUponCreate,
  }) {
  const {
    isSaasUser,
  } = useComponentStateReference();

  const getDynamicFields = () => {
    if (isSaasUser !== true && pipelineInstructionsModel?.isNew()) {
      return (
        <Col xs={12}>
          <RoleAccessInput
            model={pipelineInstructionsModel}
            setModel={setPipelineInstructionsModel}
          />
        </Col>
      );
    }
  };

  const setAttributesData = (attributes) => {
    pipelineInstructionsModel.setData("attributes", attributes);
    setPipelineInstructionsModel({...pipelineInstructionsModel});
  };

  if (pipelineInstructionsModel == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={pipelineInstructionsModel}
      setModel={setPipelineInstructionsModel}
      handleClose={handleClose}
      showDeleteButton={false}
      viewDetailsUponCreate={viewDetailsUponCreate}
      className={"mx-2 mb-2"}
    >
      <Row>
        <Col xs={12} md={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={pipelineInstructionsModel}
            setDataObject={setPipelineInstructionsModel}
          />
        </Col>
        <Col xs={12} md={6}>
          <PipelineInstructionsTypeSelectInput
            model={pipelineInstructionsModel}
            setModel={setPipelineInstructionsModel}
          />
        </Col>
        <Col xs={12}>
          <RichTextInput
            fieldName={"instructions"}
            model={pipelineInstructionsModel}
            setModel={setPipelineInstructionsModel}
            // minimumHeight={"150px"}
            // maximumHeight={"1000px"}
          />
        </Col>
        <Col xs={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={pipelineInstructionsModel}
            setDataObject={setPipelineInstructionsModel}
          />
        </Col>
        {/*<Col xs={12}>*/}
        {/*  <PipelineInstructionsAttributesEditorPanel*/}
        {/*    attributes={pipelineInstructionsModel?.getData("attributes")}*/}
        {/*    setAttributesData={setAttributesData}*/}
        {/*  />*/}
        {/*</Col>*/}
        {getDynamicFields()}
        <Col xs={12}>
          <TagMultiSelectInput
            dataObject={pipelineInstructionsModel}
            setDataObject={setPipelineInstructionsModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

PipelineInstructionsEditorPanel.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
  handleClose: PropTypes.func,
  setPipelineInstructionsModel: PropTypes.func,
  viewDetailsUponCreate: PropTypes.bool,
};


