import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TagTypeSelectInput from "components/common/list_of_values_input/settings/tags/TagTypeSelectInput";
import TagConfigurationInput from "components/common/list_of_values_input/settings/tags/TagConfigurationInput";

function TagEditorPanel({ tagData, setTagData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tagDataDto, setTagDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setTagDataDto(tagData);
    setIsLoading(false);
  };

  const createTag = async () => {
    return await adminTagsActions.create(tagDataDto, getAccessToken);
  };

  const updateTag = async () => {
    return await adminTagsActions.update(tagDataDto, getAccessToken);
  };

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      recordDto={tagDataDto}
      handleClose={handleClose}
      setRecordDto={setTagDataDto}
      createRecord={createTag}
      updateRecord={updateTag}
    >
      <Row>
        <Col md={6}>
          <TagTypeSelectInput dataObject={tagDataDto} setDataObject={setTagDataDto}/>
          <TextInputBase fieldName={"value"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
          <ActivityToggleInput fieldName={"active"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
        </Col>
        <Col md={6}>
          <TagConfigurationInput dataObject={tagDataDto} setDataObject={setTagDataDto}/>
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


