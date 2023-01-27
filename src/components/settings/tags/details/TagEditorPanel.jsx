import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TagTypeSelectInput from "components/common/list_of_values_input/settings/tags/TagTypeSelectInput";
import TagConfigurationInput from "components/common/list_of_values_input/settings/tags/TagConfigurationInput";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import useTagActions from "hooks/settings/tags/useTagActions";

function TagEditorPanel({ tagData, setTagData, handleClose }) {
  const [tagModel, setTagModel] = useState(undefined);
  const tagActions = useTagActions();

  useEffect(() => {
    setTagModel(tagData);
  }, [tagData]);

  const createTag = async () => {
    return await tagActions.createTag(tagModel);
  };

  const updateTag = async () => {
    return await tagActions.updateTag(tagModel);
  };

  const getInlineWarning = () => {
    if (!tagModel?.isNew()) {
      return (
        <InlineWarning
          className={"mb-2"}
          warningMessage={`
            Editing Type or Value on a Tag does not updating existing applications of the tag. If you edit these,
            you will need to reapply the Tag to any place it is being used for the changes to take effect.
          `}
        />
      );
    }
  };

  if (tagModel == null) {
    return null;
  }

  return (
    <EditorPanelContainer
      recordDto={tagModel}
      handleClose={handleClose}
      setRecordDto={setTagModel}
      createRecord={createTag}
      updateRecord={updateTag}
    >
      {getInlineWarning()}
      <Row>
        <Col md={tagModel?.isNew() === true ? 12 : 6}>
          <TagTypeSelectInput dataObject={tagModel} setDataObject={setTagModel}/>
          <TextInputBase fieldName={"value"} setDataObject={setTagModel} dataObject={tagModel}/>
          <ActivityToggleInput fieldName={"active"} setDataObject={setTagModel} dataObject={tagModel}/>
        </Col>
        <Col md={tagModel?.isNew() === true ? 12 : 6}>
          <TagConfigurationInput dataObject={tagModel} setDataObject={setTagModel}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

TagEditorPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  handleClose: PropTypes.func
};

export default TagEditorPanel;


