import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import modelHelpers from "components/common/model/modelHelpers";
import azureStorageMetadata from "../azure-storage-metadata";
import azureStorageActions from "../../azure-storage-actions";

function AzureStorageEditorPanel({ azureStorageData, toolData, handleClose, editMode, editRowData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [azureStorageModel, setAzureStorageModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [azureStorageData]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      if(editMode){
        const response = await azureStorageActions.getAzureStorageDetails(toolData.getData("_id"), editRowData.storageName, getAccessToken, cancelSource);
        
        if(response && response?.status === 200) {
          setAzureStorageModel(modelHelpers.parseObjectIntoModel(response?.data?.message ? response.data.message : {}, azureStorageMetadata));
        }
      }else{
        setAzureStorageModel(azureStorageData);
      }      
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createAzureStorage = async () => {
    let newConfiguration = azureStorageModel.getPersistData();
    const response = await azureStorageActions.createAzureStorage(getAccessToken, cancelTokenSource, toolData?._id, newConfiguration);
    handleClose();
    return response;
  };

  const deleteAzureStorage = async () => {
    const response = await azureStorageActions.deleteAzureStorage(getAccessToken, cancelTokenSource, toolData?._id, azureStorageModel.getPersistData());
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (editMode) {
      return (
        <DeleteButtonWithInlineConfirmation dataObject={azureStorageModel} deleteRecord={deleteAzureStorage}/>
      );
    }
  };

  if (isLoading || azureStorageModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={azureStorageModel}
      createRecord={createAzureStorage}
      updateRecord={createAzureStorage}
      setRecordDto={setAzureStorageModel}
      isLoading={isLoading}
      extraButtons={getExtraButtons()}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={azureStorageModel}
            setDataObject={setAzureStorageModel}            
            fieldName={"storageName"}
            disabled={editMode}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            dataObject={azureStorageModel}
            setDataObject={setAzureStorageModel}            
            fieldName={"bucketName"}
            disabled={editMode}
          />
        </Col>
      </Row>      
    </EditorPanelContainer>
  );
}

AzureStorageEditorPanel.propTypes = {
  azureStorageData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  handleClose: PropTypes.func,
  editMode: PropTypes.bool,
  editRowData: PropTypes.object,
};

export default AzureStorageEditorPanel;
