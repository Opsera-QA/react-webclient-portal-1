import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JFrogMavenPackageTypeInput from "./inputs/JFrogMavenPackageTypeInput";
import jFrogToolRepositoriesActions from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jFrogToolRepositories.actions";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";

function JFrogRepositoryEditorPanel({ 
  toolData, 
  jfrogRepositoryData, 
  setJFrogRepositoryData, 
  handleClose, 
  jfrogRepositories,
  editMode
}) {  
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createJFrogMavenRepository = async () => {

    const repoAlreadyExists = jfrogRepositories.some(repo => repo.key === jfrogRepositoryData.getData("key"));    
    if (repoAlreadyExists) {
      throw new Error("Name Must Be Unique");      
    }

    const newRepo = jfrogRepositoryData.getPersistData();
    let postBody = {
      toolId: toolData.getData("_id"),
      packageType: newRepo.packageType,
      repositoryName: newRepo.key,
      description: newRepo.description,
    };

    try {
      const response = await jFrogToolRepositoriesActions.createRepository(postBody, getAccessToken, cancelTokenSource);
      if (response && response.status === 200) {      
        handleClose();
      }      
    } catch (error) {      
      toastContext.showErrorDialog(error);      
    }
  };

  const updateJFrogMavenRepository = async () => {

    const repo = jfrogRepositoryData.getPersistData();

    let postBody = {
      toolId: toolData.getData("_id"),      
      repositoryName: repo.key,
      description: repo.description,
    };

    try {
      const response = await jFrogToolRepositoriesActions.updateRepository(postBody, getAccessToken, cancelTokenSource);
      if (response && response.status === 200) {      
        handleClose();
      }      
    } catch (error) {      
      toastContext.showErrorDialog(error);      
    }    
  };

  const deleteJFrogMavenRepository = async () => {
    const repo = jfrogRepositoryData.getPersistData();
    let postBody = {
      toolId: toolData.getData("_id"),      
      repositoryName: repo.key
    };
    const response = await jFrogToolRepositoriesActions.deleteRepository(postBody, getAccessToken, cancelTokenSource);
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (editMode) {
      return (
        <DeleteButtonWithInlineConfirmation dataObject={jfrogRepositoryData} deleteRecord={deleteJFrogMavenRepository}/>
      );
    }
  };

  return (
    <EditorPanelContainer
      recordDto={jfrogRepositoryData}
      setRecordDto={setJFrogRepositoryData}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      updateRecord={updateJFrogMavenRepository}
      createRecord={createJFrogMavenRepository}
      lenient={true}
      disable={jfrogRepositoryData == null || !jfrogRepositoryData.checkCurrentValidity() || jfrogRepositoryData == null || !jfrogRepositoryData.checkCurrentValidity()}
    >
      <div className="text-muted pt-1 pb-3">
        Enter the required configuration information below. These settings will be used for Repository Creation.
      </div>
      <Row>
        <Col lg={12}>
          <TextInputBase dataObject={jfrogRepositoryData} setDataObject={setJFrogRepositoryData} fieldName={"key"} disabled={editMode} />
        </Col>
        <Col lg={12}>
          <TextInputBase dataObject={jfrogRepositoryData} setDataObject={setJFrogRepositoryData} fieldName={"description"} />
        </Col>
      </Row>
      <JFrogMavenPackageTypeInput dataObject={jfrogRepositoryData} setDataObject={setJFrogRepositoryData} fieldName={"packageType"} disabled={true} />      
    </EditorPanelContainer>
  );
}

JFrogRepositoryEditorPanel.propTypes = {
  toolData: PropTypes.object,
  jfrogRepositoryData: PropTypes.object,
  setJFrogRepositoryData: PropTypes.func,
  handleClose: PropTypes.func,
  jfrogRepositories: PropTypes.array,
  editMode: PropTypes.bool,
};

export default JFrogRepositoryEditorPanel;
