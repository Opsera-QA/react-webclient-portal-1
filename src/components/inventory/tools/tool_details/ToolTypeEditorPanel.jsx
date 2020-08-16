import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "../../../common/loading";
import {getFromValidationErrorToast, getPersistToast} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import Model, {DataState} from "../../../../core/data_model/model";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoMultipleInput from "../../../common/input/dto_input/dto-multiple-input";
import DtoItemInput from "../../../common/input/dto_input/item-displayer/dto-item-input";
import toolsActions from "../tools-actions";

function ToolTypeEditorPanel({ toolData, setToolData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);
  const [toolDataDto, setToolDataDto] = useState({});
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    catch (err) {
      // setErrors(err.message);
      console.log(err.message);
    }
  };

  const createToolType = async () => {
    console.log("Persisting new tool type to DB: " + JSON.stringify(toolDataDto.data));

    if (toolDataDto.isModelValid()) {
      let createToolTypeResponse = await toolsActions.createTool(toolDataDto, getAccessToken);
      if (createToolTypeResponse.error != null) {
        const errorMsg = `Microservice error reported creating the tool: ${toolDataDto["name"]}.  Error returned: ${JSON.stringify(createToolTypeResponse.error.message, null, 2)}`;
        console.error(errorMsg);
        let toast = getPersistToast(false, "create", "user", errorMsg, setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      else {
        handleClose();
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateToolType = async () => {
    if(toolDataDto.isModelValid()) {
      try {
        console.log("Attempting to update: " + JSON.stringify(toolDataDto.data));
        let response = await toolsActions.updateTool(toolDataDto, getAccessToken);
        // getToolRegistryItem(toolId);
        console.log("response: " + JSON.stringify(response));
        let updatedDto = new Model(response.data, toolDataDto.metaData, false);
        setToolDataDto(updatedDto);
        setToolData(updatedDto);
        let toast = getPersistToast(true, "update", "Tool Type", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
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

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height p-2">
          {showToast && toast}
          <Row>
            <Col lg={6}>
              <DtoTextInput disabled={!toolDataDto.isNew()} setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"name"} />
            </Col>
            <Col lg={6}>
              <DtoTextInput disabled={true} setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"compliance"} />
            </Col>
            <Col lg={6}>
              <DtoSelectInput setDataFunction={handleToolIdentifierChange} setDataObject={setToolDataDto} textField={"name"} valueField={"identifier"} dataObject={toolDataDto} groupBy={"tool_type_identifier"} selectOptions={toolList} fieldName={"tool_identifier"} />
            </Col>
            <Col lg={6}>
              <DtoTextInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"description"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"location"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"projects"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "email", "user_id"]} fieldName={"contacts"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"applications"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"organization"} />
            </Col>
            <Col lg={6}>
              <DtoToggleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"active"} />
            </Col>
            <Col lg={6}>
              <DtoItemInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"tags"} />
            </Col>
          </Row>
          <Row>
              <div className="ml-auto px-3">
                {toolDataDto.isNew() ? <Button size="sm" variant="primary" disabled={false} onClick={() => createToolType()}>Create Tool Type</Button>
                  : <Button size="sm" variant="primary" disabled={toolDataDto.dataState === DataState.LOADED} onClick={() => updateToolType()}>Save changes</Button>}
              </div>
            }
          </Row>
        </div>
      </>}
    </>
  );
}

ToolTypeEditorPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolTypeEditorPanel;


