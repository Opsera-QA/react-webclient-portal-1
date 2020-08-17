import React, { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import Loading from "../../../../common/loading";
import {Button, Col, Row} from "react-bootstrap";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import DtoItemInput from "../../../../common/input/dto_input/item-displayer/dto-item-input";
import Model, {DataState} from "../../../../../core/data_model/model";
import toolTypeActions from "../../tool-management-actions";
import {getFromValidationErrorToast, getPersistToast} from "../../../../common/toasts/toasts";

function ToolTypeEditorPanel( { toolTypeData, setToolTypeData, handleClose, }) {
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
        let toast = getPersistToast(true, "update", "Tool Type", undefined, setShowToast);
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

  const updateToolType = async () => {
    if(toolTypeDataDto.isModelValid()) {
      try {
        const response = await toolTypeActions.updateToolType(toolTypeDataDto, getAccessToken);
        console.log("Response.data: " + JSON.stringify(response));
        let toast = getPersistToast(true, "update", "Tool Type", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(response.data, toolTypeDataDto.metaData, false);
        setToolTypeDataDto(updatedDto);
        setToolTypeData(updatedDto);
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

  const deleteTool = async () => {
    // try {
    //   const accessToken = await getAccessToken();
    //   const response = await axiosApiService(accessToken).delete("/registry/type/"+ toolData._id, { });
    //   console.log(response.data);
    //   props.closeModal(false);
    // }
    // catch (err) {
    //   console.log(err.message);
    // }
  };
  
  return (
    <>
      {isLoading ? <Loading size="sm"/> : null}

      {!isLoading && <>
        <div className="mx-2 my-3">
          {showToast && toast}
          <Row>
            <Col lg={6}>
              <DtoTextInput disabled={!toolTypeDataDto.isNew()} fieldName={"name"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
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
            <div className="ml-auto m-3 px-3">
              {toolTypeDataDto.isNew()
                ? <Button size="sm" variant="primary" onClick={() => createToolType()}>Create Tool Type</Button>
                : <Button size="sm" variant="primary" disabled={toolTypeDataDto.dataState === DataState.LOADED}
                          onClick={() => updateToolType()}>Save Changes</Button>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

ToolTypeEditorPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolTypeEditorPanel;


