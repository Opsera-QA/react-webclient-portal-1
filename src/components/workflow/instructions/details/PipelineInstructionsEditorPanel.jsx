import React, {useState} from "react";
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
  from "components/common/list_of_values_input/workflow/instructions/type/PipelineInstructionsTypeSelectInput";
import PipelineInstructionsAttributesEditorPanel
  from "components/workflow/instructions/details/PipelineInstructionsAttributesEditorPanel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function PipelineInstructionsEditorPanel(
  {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    handleClose,
    viewDetailsUponCreate,
  }) {
  const [attributesModel, setAttributesModel] = useState(undefined);
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
    const savedTags = DataParsingHelper.parseArray(pipelineInstructionsModel?.getData("tags"), []);
    const filteredSavedTags = savedTags.filter((tag) => tag.type !== "environment" && tag.type !== "release");
    const environmentTags = DataParsingHelper.parseArray(attributes?.environments, []);
    const releaseTags = DataParsingHelper.parseArray(attributes?.release, []);
    filteredSavedTags.push(...environmentTags);
    filteredSavedTags.push(...releaseTags);
    pipelineInstructionsModel.setData("tags", filteredSavedTags);
    setPipelineInstructionsModel({...pipelineInstructionsModel});
  };

  const handleTagsUpdate = (newModel) => {
    const tags = DataParsingHelper.parseArray(newModel?.getData("tags"), []);
    const environmentTags = tags.filter(tag => tag.type === "environment");
    const releaseTags = tags.filter(tag => tag.type === "release");

    if (attributesModel) {
      attributesModel?.setData("environments", environmentTags);
      attributesModel?.setData("release", releaseTags);
      setAttributesModel({...attributesModel});
    }

    setPipelineInstructionsModel({...newModel});
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
            disabled={pipelineInstructionsModel?.isNew() !== true}
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
        <PipelineInstructionsAttributesEditorPanel
          attributes={pipelineInstructionsModel?.getData("attributes")}
          tags={pipelineInstructionsModel?.getData("tags")}
          setAttributesData={setAttributesData}
          attributesModel={attributesModel}
          setAttributesModel={setAttributesModel}
        />
        {getDynamicFields()}
        <Col xs={12}>
          <TagMultiSelectInput
            dataObject={pipelineInstructionsModel}
            setDataObject={handleTagsUpdate}
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


