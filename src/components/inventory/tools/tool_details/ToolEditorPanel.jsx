import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  getCreateFailureResultDialog, getCreateSuccessResultDialog,
  getFormValidationErrorDialog,
  getLoadingErrorDialog,
  getUpdateFailureResultDialog, getUpdateSuccessResultDialog
} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import Model from "../../../../core/data_model/model";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoMultipleInput from "../../../common/input/dto_input/dto-multiple-input";
import toolsActions from "../tools-actions";
import SaveButton from "../../../common/buttons/SaveButton";
import LoadingDialog from "../../../common/status_notifications/loading";
import DtoTagManagerInput from "../../../common/input/dto_input/dto-tag-manager-input";

function ToolEditorPanel({ toolData, setToolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);
  const [toolDataDto, setToolDataDto] = useState({});
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [ toolList, setToolList ] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolDataDto(toolData);
    await getToolList();
    setIsLoading(false);
  };

  // TODO: Rewrite
  const getToolList = async () => {
    try {
      const toolResponse = await toolsActions.getTools(getAccessToken);
      setToolList(toolResponse.data);
    }
    catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      setLoadingError(true);
      console.error(error.message);
    }
  };

  const createTool = async () => {
    if (toolDataDto.isModelValid()) {
      try {
        console.log("toolDataDto: " + JSON.stringify(toolDataDto));
        let createToolTypeResponse = await toolsActions.createTool(toolDataDto, getAccessToken);
        let toast = getCreateSuccessResultDialog(toolDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (error) {
        let toast = getCreateFailureResultDialog(toolDataDto.getType(), error.message, setShowToast);
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

  const updateTool = async () => {
    if(toolDataDto.isModelValid()) {
      try {
        let response = await toolsActions.updateTool(toolDataDto, getAccessToken);
        let updatedDto = new Model(response.data, toolDataDto.metaData, false);
        setToolDataDto(updatedDto);
        setToolData(updatedDto);
        let toast = getUpdateSuccessResultDialog(toolDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (error) {
        let toast = getUpdateFailureResultDialog(toolDataDto.getType(), error.message, setShowToast);
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

  // const deleteTool = async () => {
  //   setShowDeleteModal(false);
  //   try {
  //     setLoading(true);
  //     const accessToken = await getAccessToken();
  //     let apiUrl = "/registry/" + toolId;
  //     await axiosApiService(accessToken).delete(apiUrl, {});
  //     toggleViewModal(false);
  //   }
  //   catch (err) {
  //     console.log(err.message);
  //     setErrors(err.message);
  //   }
  //   getToolRegistryList(null);
  // };

  const handleToolIdentifierChange = (fieldName, value) => {
    // console.log("value.tool_identifier", value.identifier);
    // console.log("value.tool_type_identifier", value.tool_type_identifier);
    let newDataObject = toolDataDto;
    newDataObject.setData("tool_identifier", value.identifier);
    newDataObject.setData("type", value.tool_type_identifier);
    // console.log(JSON.stringify(value));

    // setFormData({ ...formData, tool_identifier: selectedOption.identifier, type: selectedOption.tool_type_identifier });
    setToolDataDto({...newDataObject});
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (loadingError) {
    return (<span>{showToast && toast}</span>);
  } else {
    return (
      <>
        {showToast && toast}
        <div className="scroll-y full-height p-2">
          <Row>
            <Col lg={6}>
              <DtoTextInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"name"}/>
            </Col>
            <Col lg={6}>
              <DtoSelectInput setDataFunction={handleToolIdentifierChange} setDataObject={setToolDataDto}
                              textField={"name"} valueField={"identifier"} dataObject={toolDataDto}
                              groupBy={"tool_type_identifier"} selectOptions={toolList} fieldName={"tool_identifier"}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"description"}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput disabled={true} setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"compliance"} />
            </Col>
            <Col lg={6}>
              <DtoTagManagerInput type={"tool"} setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"tags"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"location"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"projects"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput disabledFields={["user_id"]} setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "email", "user_id"]} fieldName={"contacts"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"applications"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"organization"} />
            </Col>
            <Col lg={6}>
              <DtoToggleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"active"}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={toolDataDto} createRecord={createTool} updateRecord={updateTool} />
            </div>
            }
          </Row>
        </div>
      </>
    );
  }
}

ToolEditorPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
};

export default ToolEditorPanel;


