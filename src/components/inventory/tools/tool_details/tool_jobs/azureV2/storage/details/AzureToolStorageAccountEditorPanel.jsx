import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import azureStorageActions from "../../azureStorage.actions";
import StandaloneDeleteButtonWithConfirmationModal
  from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";
import modelHelpers from "components/common/model/modelHelpers";
import azureStorageMetadata from "../azure-storage-metadata";


function AzureToolStorageEditorPanel({ azureStorageAccountsModel, setAzureStorageAccountsModel, toolId, handleClose, toolData }) {
  const { getAccessToken } = useContext(AuthContext);
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
  }, []);

  const loadData = async () => {
    setAzureStorageAccountsModel(modelHelpers.parseObjectIntoModel({}, azureStorageMetadata));
    // setAzureStorageAccountsModel(modelHelpers.getToolConfigurationModel(null, azureStorageMetadata));
  };

  const createAzureStorageCredentials = async () => {
    const azureStorageAccountData = azureStorageAccountsModel.getPersistData();
    const {storageAccountName, azureStorageAccountToken} = azureStorageAccountData;
    console.log(azureStorageAccountData);
    const response = await azureStorageActions.createAzureToolStorageAccount(getAccessToken, cancelTokenSource, toolId, storageAccountName, azureStorageAccountToken );
    return response;
  };

  const deleteAzureStorage = async () => {
    const response = await azureStorageActions.deleteAzureStorage(getAccessToken, cancelTokenSource, toolId, azureStorageAccountsModel.getPersistData());
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (azureStorageAccountsModel?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={azureStorageAccountsModel}
          deleteDataFunction={deleteAzureStorage}
          handleCloseFunction={handleClose}
        />
      );
    }
  };

  return (
    <EditorPanelContainer
      recordDto={azureStorageAccountsModel}
      createRecord={createAzureStorageCredentials}
      updateRecord={createAzureStorageCredentials}
      setRecordDto={setAzureStorageAccountsModel}
      lenient={false}
      extraButtons={getExtraButtons()}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={azureStorageAccountsModel}
            setDataObject={setAzureStorageAccountsModel}            
            fieldName={"storageAccountName"}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            dataObject={azureStorageAccountsModel}
            setDataObject={setAzureStorageAccountsModel}            
            fieldName={"azureStorageAccountToken"}
          />
        </Col>
      </Row>      
    </EditorPanelContainer>
  );
}

AzureToolStorageEditorPanel.propTypes = {
  azureStorageAccountsModel: PropTypes.object,
  setAzureStorageAccountsModel: PropTypes.func,
  toolId: PropTypes.string,
  handleClose: PropTypes.func,
  toolData: PropTypes.object
};

export default AzureToolStorageEditorPanel;
