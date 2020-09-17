import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import adminTagsActions from "../admin-tags-actions";
import LoadingDialog from "../../../common/status_notifications/loading";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoMultipleInput from "../../../common/input/dto_input/dto-multiple-input";
import SaveButton from "../../../common/buttons/SaveButton";
import Col from "react-bootstrap/Col";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import {defaultTags} from "../tags-form-fields";

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

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        <div className="mx-2 my-3">
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
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton handleClose={handleClose} recordDto={tagDataDto} setRecordDto={setTagDataDto} setData={setTagData} createRecord={createTag} updateRecord={updateTag} />
            </div>
          </Row>
        </div>
      </>
    );
  }
}

TagEditorPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  handleClose: PropTypes.func
};

export default TagEditorPanel;


