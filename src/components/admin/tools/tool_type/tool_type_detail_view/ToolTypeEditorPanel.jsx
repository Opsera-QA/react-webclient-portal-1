import React, { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import {Button, Col, Row} from "react-bootstrap";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import DtoItemInput from "../../../../common/input/dto_input/item-displayer/dto-item-input";
import Model, {DataState} from "../../../../../core/data_model/model";
import toolTypeActions from "../../tool-management-actions";
import {
  getCreateFailureResultDialog,
  getCreateSuccessResultDialog, getDeleteFailureResultDialog, getDeleteSuccessResultDialog,
  getFormValidationErrorDialog,
  getUpdateFailureResultDialog, getUpdateSuccessResultDialog
} from "../../../../common/toasts/toasts";
import LoadingDialog from "../../../../common/status_notifications/loading";
import SaveButton from "../../../../common/buttons/SaveButton";

function ToolTypeEditorPanel( { toolTypeData, setToolTypeData, }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolTypeDataDto, setToolTypeDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolTypeDataDto(toolTypeData);
    setIsLoading(false);
  };

  const createToolType = async () => {
    if(toolTypeDataDto.isModelValid()) {
      try {
        const response = await toolTypeActions.createToolType(toolTypeDataDto, getAccessToken);
        let toast = getCreateSuccessResultDialog("Tool Type", setShowToast, "top");
        setToast(toast);
        setShowToast(true);
      } catch (error) {
        let toast = getCreateFailureResultDialog("Tool Type", error.message, setShowToast, "top");
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateToolType = async () => {
    if(toolTypeDataDto.isModelValid()) {
      try {
        const response = await toolTypeActions.updateToolType(toolTypeDataDto, getAccessToken);
        let toast = getUpdateSuccessResultDialog( "Tool Type", setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(response.data, toolTypeDataDto.metaData, false);
        setToolTypeDataDto(updatedDto);
        setToolTypeData(updatedDto);
      } catch (error) {
        let toast = getUpdateFailureResultDialog("Tool Type", error.message, setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const deleteTool = async () => {
    try {
      const response = await toolTypeActions.deleteToolType(toolTypeDataDto, getAccessToken);
      let toast = getDeleteSuccessResultDialog("Tool Type", setShowToast, "top");
      setToast(toast);
      setShowToast(true);
      setToolTypeDataDto(null);
      setToolTypeData(null);
    } catch (error) {
      let toast = getDeleteFailureResultDialog("Tool Type", error.message, setShowToast, "top");
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
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
            <Col lg={6}>
              <DtoTextInput disabled={!toolTypeDataDto.isNew()} fieldName={"name"} dataObject={toolTypeDataDto}
                            setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoToggleInput fieldName={"active"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput fieldName={"description"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput fieldName={"identifier"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoItemInput fieldName={"tags"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={toolTypeDataDto} createRecord={createToolType}
                          updateRecord={updateToolType} type={"Tool Type"}/>
            </div>
          </Row>
        </div>
      </>
    );
  }
}

ToolTypeEditorPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
};

export default ToolTypeEditorPanel;


