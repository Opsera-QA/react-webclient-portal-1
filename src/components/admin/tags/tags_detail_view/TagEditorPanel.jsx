import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import adminTagsActions from "../admin-tags-actions";
import LoadingDialog from "../../../common/status_notifications/loading";
import {
  getCreateFailureResultDialog,
  getCreateSuccessResultDialog,
  getFormValidationErrorDialog, getUpdateFailureResultDialog, getUpdateSuccessResultDialog
} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoMultipleInput from "../../../common/input/dto_input/dto-multiple-input";
import SaveButton from "../../../common/buttons/SaveButton";
import Col from "react-bootstrap/Col";
import Model from "../../../../core/data_model/model";

function TagEditorPanel({ tagData, setTagData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tagDataDto, setTagDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setTagDataDto(tagData);
    setIsLoading(false);
  };

  const createTag = async () => {
    if (tagDataDto.isModelValid()) {
      try {
        let createTagResponse = await adminTagsActions.create(tagDataDto, getAccessToken);
        let toast = getCreateSuccessResultDialog("Tag", setShowToast, "top");
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(createTagResponse.data, tagDataDto.metaData, false);
        setTagDataDto(updatedDto);
        setTagData(updatedDto);
      } catch (error) {
        let toast = getCreateFailureResultDialog("Tag", error.message, setShowToast, "top");
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    } else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateTag = async () => {
    if (tagDataDto.isModelValid()) {
      try {
        const response = await adminTagsActions.update(tagDataDto, getAccessToken);
        let toast = getUpdateSuccessResultDialog("Tag", setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(response.data, tagDataDto.metaData, false);
        setTagDataDto(updatedDto);
        setTagData(updatedDto);
      } catch (error) {
        let toast = getUpdateFailureResultDialog("Tag", error.message, setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    } else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        {showToast && toast}
        <div className="mx-2 my-3">
          <Row>
            <Col>
              <DtoTextInput fieldName={"type"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
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
              <SaveButton recordDto={tagDataDto} createRecord={createTag} updateRecord={updateTag} type={"Tag"} />
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
  handleClose: PropTypes.func,
};

TagEditorPanel.defaultProps = {
  newTag: false,
};

export default TagEditorPanel;


