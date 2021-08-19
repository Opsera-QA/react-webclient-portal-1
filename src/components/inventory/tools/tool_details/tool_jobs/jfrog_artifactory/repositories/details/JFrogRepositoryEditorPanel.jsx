import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {generateUUID} from "components/common/helpers/string-helpers";
import JFrogMavenPackageTypeInput from "./inputs/JFrogMavenPackageTypeInput";
import jfrogActions from "../jfrog-actions";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";


function JFrogRepositoryEditorPanel({ 
  toolData, 
  jfrogRepositoryData, 
  setJFrogRepositoryData, 
  handleClose, 
  jfrogRepositories, 
  setJfrogRepositories
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

    // loadData().catch((error) => {
    //   if (isMounted?.current === true) {
    //     throw error;
    //   }
    // });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createJFrogMavenRepository = async () => {

    const repoAlreadyExists = jfrogRepositories.some(repo => repo.key === jfrogRepositoryData.getData("key"));
    console.log({repoAlreadyExists});
    if (repoAlreadyExists) {
      throw new Error("Name Must Be Unique");      
    }

    const newRepo = jfrogRepositoryData.getPersistData();
    console.log({newRepo});
    let postBody = {
      toolId: toolData.getData("_id"),
      packageType: newRepo.packageType,
      repositoryName: newRepo.key,
      description: newRepo.description,
    };
    console.log({postBody});
    // jfrogRepositories.push(newProject);
    // setJfrogRepositories    
    try {
      const response = await jfrogActions.createRepository(postBody, getAccessToken, cancelTokenSource);
      console.log({response});
      if (response && response.status === 200) {
        // setRepos(res.data);        
        return;
      }
      // setRepos([]);
    } catch (error) {
      console.log("in catch");
      console.log({error});
      toastContext.showErrorDialog(error);
      
    }
  };

  const updateJFrogMavenRepository = async () => {    

    if (jfrogRepositoryData.isChanged("description")) {
      const originalDesc = jfrogRepositoryData.getOriginalValue("description");
    }

    const currentIndex = jfrogRepositories.findIndex(repo => repo.key === jfrogRepositoryData.getData("key"));
    const newRepo = jfrogRepositoryData.getPersistData();    

    if (currentIndex != null) {
      // jfrogRepositories[currentIndex] = jfrogRepositoryData.getPersistData();
      console.log({currentIndex});
    }
    else {
      throw new Error("Could not find repository to update");
    }

    let postBody = {
      toolId: toolData.getData("_id"),      
      repositoryName: newRepo.key,
      description: newRepo.description,
    };

    const response = jfrogActions.updateRepository(postBody, getAccessToken, cancelTokenSource);
    console.log({response});
  };

  return (
    <EditorPanelContainer
      recordDto={jfrogRepositoryData}
      setRecordDto={setJFrogRepositoryData}
      handleClose={handleClose}
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
          <TextInputBase dataObject={jfrogRepositoryData} setDataObject={setJFrogRepositoryData} fieldName={"key"} />
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
  setJfrogRepositories: PropTypes.func,
};

export default JFrogRepositoryEditorPanel;
