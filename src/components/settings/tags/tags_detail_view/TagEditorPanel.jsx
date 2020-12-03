import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import adminTagsActions from "../admin-tags-actions";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoMultipleInput from "../../../common/input/dto_input/dto-multiple-input";
import Col from "react-bootstrap/Col";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import {defaultTags} from "../tags-form-fields";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import CreateAndSaveButtonContainer from "../../../common/buttons/saving/containers/CreateAndSaveButtonContainer";
import ConfigurationInput from "../../../common/input/ConfigurationInput";
import TagConfigurationInput from "../../../common/list_of_values_input/settings/tags/TagConfigurationInput";

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
            <Col>
              <DtoSelectInput textField={"value"}
                              valueField={"type"}
                              fieldName={"type"}
                              dataObject={tagDataDto}
                              setDataObject={setTagDataDto}
                              selectOptions={defaultTags}/>
            </Col>
            <Col>
              <DtoToggleInput fieldName={"active"} setDataObject={setTagDataDto} dataObject={tagDataDto} />
            </Col>
          </Row>
          <Row>
            <Col>
              <DtoTextInput fieldName={"value"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
            </Col>
            <Col>
              <DtoMultipleInput dataObject={tagDataDto} setDataObject={setTagDataDto} fields={["name", "value"]} fieldName={"configuration"} />
            </Col>
          </Row>
          <CreateAndSaveButtonContainer
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


