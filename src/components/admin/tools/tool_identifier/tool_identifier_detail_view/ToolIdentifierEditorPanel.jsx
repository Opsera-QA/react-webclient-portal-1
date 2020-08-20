import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import Loading from "../../../../common/loading";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import DtoItemInput from "../../../../common/input/dto_input/item-displayer/dto-item-input";
import Model, {DataState} from "../../../../../core/data_model/model";
import toolTypeActions from "../../tool-management-actions";
import {getFromValidationErrorToast, getPersistToast} from "../../../../common/toasts/toasts";
import DtoSelectInput from "../../../../common/input/dto_input/dto-select-input";
import DtoPropertiesInput from "../../../../common/input/dto_input/dto-properties-input";

function ToolIdentifierEditorPanel( {toolIdentifierData, setToolIdentifierData, handleClose} ) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolList, setToolList] = useState([]);
  const [toolIdentifierDataDto, setToolIdentifierDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
      console.log("Tool List: " + JSON.stringify(toolResponse.data))
      setToolList(toolResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const createToolIdentifier = async () => {
    if(toolIdentifierDataDto.isModelValid()) {
      try {
        const response = await toolTypeActions.createToolIdentifier(toolIdentifierDataDto, getAccessToken);
        let toast = getPersistToast(true, "update", "Tool Identifier", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
        handleClose();
      } catch (err) {
        console.log(err.message);
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateToolIdentifier = async () => {
    if(toolIdentifierDataDto.isModelValid()) {
      try {
        const response = await toolTypeActions.updateToolIdentifier(toolIdentifierDataDto, getAccessToken);
        console.log("Response.data: " + JSON.stringify(response));
        let toast = getPersistToast(true, "update", "Tool Type", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(response.data, toolIdentifierDataDto.metaData, false);
        setToolIdentifierData(updatedDto);
        setToolIdentifierDataDto(updatedDto);
      } catch (err) {
        console.log(err.message);
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  return (
    <>
      {isLoading ? <Loading size="sm"/> : null}

      {!isLoading && <>
        <div className="mx-2 my-3">
          {showToast && toast}
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
            <div className="ml-auto m-3 px-3">
              {toolIdentifierDataDto.isNew()
                ? <Button size="sm" variant="primary" onClick={() => createToolIdentifier()}>Create Tool Identifier</Button>
                : <Button size="sm" variant="primary" disabled={toolIdentifierDataDto.dataState === DataState.LOADED}
                          onClick={() => updateToolIdentifier()}>Save Changes</Button>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

ToolIdentifierEditorPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  handleClose: PropTypes.func,
  setToolIdentifierData: PropTypes.func
};

export default ToolIdentifierEditorPanel;
