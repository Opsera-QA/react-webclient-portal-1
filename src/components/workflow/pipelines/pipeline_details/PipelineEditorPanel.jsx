import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {getFormValidationErrorDialog, getPersistResultDialog} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoItemInput from "../../../common/input/dto_input/item-displayer/dto-item-input";

// TODO: Implement when refactoring pipeline overview page
function PipelineEditorPanel({ pipelineData, setPipelineData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);
  const [pipelineDataDto, setPipelineDataDto] = useState({});
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setPipelineDataDto(pipelineData);
    setIsLoading(false);
  };

  const createPipeline = async () => {
  //   // console.log("Persisting new tool to DB: " + JSON.stringify(toolDataDto.data));
  //
    if (pipelineDataDto.isModelValid()) {
  //     let createPipelineResponse = await toolsActions.createTool(pipelineDataDto, getAccessToken);
  //     if (createPipelineResponse.error != null) {
  //       const errorMsg = `Microservice error reported creating the tool: ${pipelineDataDto["name"]}.  Error returned: ${JSON.stringify(createPipelineResponse.error.message, null, 2)}`;
  //       console.error(errorMsg);
  //       let toast = getPersistResultDialog(false, "create", "user", errorMsg, setShowToast);
  //       setToast(toast);
  //       setShowToast(true);
  //     }
  //     else {
  //       handleClose();
  //     }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updatePipeline = async () => {
    if(pipelineDataDto.isModelValid()) {
      try {
        // console.log("Attempting to update: " + JSON.stringify(pipelineDataDto.data));
        // let updatePipelineResponse = await toolsActions.updateTool(pipelineDataDto, getAccessToken);
        // getToolRegistryItem(toolId);
        // console.log("response: " + JSON.stringify(response));
        // let updatedDto = new Model(updatePipelineResponse.data, pipelineDataDto.metaData, false);
        // setPipelineDataDto(updatedDto);
        // setPipelineData(updatedDto);
        // let toast = getPersistResultDialog(true, "update", "Tool Type", undefined, setShowToast);
        // setToast(toast);
        // setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  // const deletePipeline = async () => {
  //   setShowDeleteModal(false);
  //   try {
  //     setLoading(true);
  //     const accessToken = await getAccessToken();
  //     let apiUrl = "/registry/" + toolId;
  //     await axiosApiService(accessToken).delete(apiUrl, {});
  //   }
  //   catch (err) {
  //     console.log(err.message);
  //     setErrors(err.message);
  //   }
  // };

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height p-2">
          {showToast && toast}
          <Row>
            <Col lg={6}>
              <DtoTextInput setDataObject={setPipelineDataDto} dataObject={pipelineDataDto} fieldName={"name"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setPipelineDataDto} dataObject={pipelineDataDto} fieldName={"description"} />
            </Col>
            <Col lg={6}>
              <DtoItemInput setDataObject={setPipelineDataDto} dataObject={pipelineDataDto} fieldName={"tags"} />
            </Col>
          </Row>
          <Row>
              <div className="ml-auto px-3">
                {pipelineDataDto.isNew() ? <Button size="sm" variant="primary" disabled={false} onClick={() => createPipeline()}>Create Tool</Button>
                  : <Button size="sm" variant="primary" disabled={pipelineDataDto.dataState === DataState.LOADED} onClick={() => updatePipeline()}>Save changes</Button>}
              </div>
            }
          </Row>
        </div>
      </>}
    </>
  );
}

PipelineEditorPanel.propTypes = {
  pipelineData: PropTypes.object,
  setPipelineData: PropTypes.func,
  handleClose: PropTypes.func
};

export default PipelineEditorPanel;


