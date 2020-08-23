import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import DtoItemInput from "../../../../common/input/dto_input/item-displayer/dto-item-input";
import Model, {DataState} from "../../../../../core/data_model/model";
import toolTypeActions from "../../tool-management-actions";
import {
  getCreateFailureResultDialog, getCreateSuccessResultDialog,
  getFormValidationErrorDialog, getLoadingErrorDialog,
  getUpdateFailureResultDialog,
  getUpdateSuccessResultDialog
} from "../../../../common/toasts/toasts";
import DtoSelectInput from "../../../../common/input/dto_input/dto-select-input";
import DtoPropertiesInput from "../../../../common/input/dto_input/dto-properties-input";
import SaveButton from "../../../../common/buttons/SaveButton";
import LoadingDialog from "../../../../common/status_notifications/loading";

function ToolIdentifierEditorPanel( {toolIdentifierData, setToolIdentifierData} ) {
  const {getAccessToken} = useContext(AuthContext);
  const [toolList, setToolList] = useState([]);
  const [toolIdentifierDataDto, setToolIdentifierDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolIdentifierDataDto(toolIdentifierData);
    await getToolList();
    setIsLoading(false);
  };

  const getToolList = async () => {
    try {
      const toolResponse = await toolTypeActions.getToolTypes(getAccessToken, false);
      setToolList(toolResponse.data);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast, "top");
      setToast(toast);
      setShowToast(true);
      setLoadingError(true);
      console.error(error.message);
    }
  };

  const createToolIdentifier = async () => {
    if (toolIdentifierDataDto.isModelValid()) {
      try {
        const response = await toolTypeActions.createToolIdentifier(toolIdentifierDataDto, getAccessToken);
        let toast = getCreateSuccessResultDialog("Tool Identifier", setShowToast, "top");
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(response.data, toolIdentifierDataDto.metaData, false);
        setToolIdentifierData(updatedDto);
        setToolIdentifierDataDto(updatedDto);
      } catch (error) {
        let toast = getCreateFailureResultDialog("Tool Identifier", error.message, setShowToast, "top");
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

  const updateToolIdentifier = async () => {
    if (toolIdentifierDataDto.isModelValid()) {
      try {
        const response = await toolTypeActions.updateToolIdentifier(toolIdentifierDataDto, getAccessToken);
        console.log("Response.data: " + JSON.stringify(response));
        let toast = getUpdateSuccessResultDialog("Tool Identifier", setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(response.data, toolIdentifierDataDto.metaData, false);
        setToolIdentifierData(updatedDto);
        setToolIdentifierDataDto(updatedDto);
      } catch (error) {
        let toast = getUpdateFailureResultDialog("Tool Identifier", error.message, setShowToast, "detailPanelTop");
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
  } else if (loadingError) {
    return (<span>{showToast && toast}</span>);
  } else {
    return (
      <>
        {showToast && toast}
        <div className="mx-2 my-3">
          <Row>
            <Col lg={6}>
              <DtoTextInput fieldName={"name"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoToggleInput fieldName={"active"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"description"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput fieldName={"identifier"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoSelectInput textField={"name"} valueField={"identifier"} fieldName={"tool_type_identifier"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} selectOptions={toolList}/>
            </Col>
            <Col lg={6}>
              <DtoItemInput fieldName={"tags"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoPropertiesInput fieldName={"properties"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} fields={["name", "value"]}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={toolIdentifierDataDto} createRecord={createToolIdentifier}
                          updateRecord={updateToolIdentifier} type={"Tool Identifier"}/>
            </div>
          </Row>
        </div>
      </>
    );
  }
}

ToolIdentifierEditorPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func
};

export default ToolIdentifierEditorPanel;
