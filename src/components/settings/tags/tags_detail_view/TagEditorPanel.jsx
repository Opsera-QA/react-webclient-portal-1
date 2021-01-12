import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import adminTagsActions from "../admin-tags-actions";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import Col from "react-bootstrap/Col";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import TagConfigurationInput from "../../../common/list_of_values_input/settings/tags/TagConfigurationInput";
import TagTypeSelectInput from "../../../common/list_of_values_input/settings/tags/TagTypeSelectInput";
import PersistButtonContainer from "components/common/buttons/saving/containers/PersistButtonContainer";

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
    <EditorPanelContainer isLoading={isLoading}>
      <div className="mx-2">
        <Row>
          <Col md={6}>
            <TagTypeSelectInput dataObject={tagDataDto} setDataObject={setTagDataDto} />
            <DtoTextInput fieldName={"value"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
            <DtoToggleInput fieldName={"active"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
          </Col>
          <Col md={6}>
            <TagConfigurationInput dataObject={tagDataDto} setDataObject={setTagDataDto}/>
          </Col>
        </Row>
        <PersistButtonContainer
          recordDto={tagDataDto}
          handleClose={handleClose}
          setRecordDto={setTagDataDto}
          createRecord={createTag}
          updateRecord={updateTag}
        />
      </div>
    </EditorPanelContainer>
  );
}

TagEditorPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  handleClose: PropTypes.func
};

export default TagEditorPanel;


