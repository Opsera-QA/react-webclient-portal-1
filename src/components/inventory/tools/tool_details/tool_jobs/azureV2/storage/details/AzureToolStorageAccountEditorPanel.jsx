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

function AzureToolStorageEditorPanel({ azureStorageAccountsModel, setAzureStorageAccountsModel, toolId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [currentAzureStorageAccountName, setCurrentAzureStorageAccountName] = useState(undefined);
  console.log(azureStorageAccountsModel);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setCurrentAzureStorageAccountName(azureStorageAccountsModel?.getData('storageAccountName'));

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createAzureStorageCredentials = async () => {
    const {newAzureStorageAccountName, newAzureStorageAccountToken} = azureStorageAccountsModel.getPersistData();
    return await azureStorageActions.createAzureToolStorageAccount(getAccessToken, cancelTokenSource, toolId, azureStorageAccountsModel, newAzureStorageAccountName, newAzureStorageAccountToken);
  };

  const updateAzureStorageCredentials = async () => {
    return await azureStorageActions.updateAzureToolStorageAccount(getAccessToken, cancelTokenSource, toolId, azureStorageAccountsModel, currentAzureStorageAccountName); 
  };

  const deleteAzureStorageCredentials = async () => {
    return await azureStorageActions.deleteAzureToolStorageAccount(getAccessToken, cancelTokenSource, toolId, currentAzureStorageAccountName);
  };

  const getExtraButtons = () => {
    if (azureStorageAccountsModel?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={azureStorageAccountsModel}
          deleteDataFunction={deleteAzureStorageCredentials}
          handleCloseFunction={handleClose}
        />
      );
    }
  };

  return (
    <EditorPanelContainer
      recordDto={azureStorageAccountsModel}
      setRecordDto={setAzureStorageAccountsModel}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      createRecord={createAzureStorageCredentials}
      updateRecord={updateAzureStorageCredentials}
      lenient={false}
      disable={azureStorageAccountsModel?.checkCurrentValidity() !== true}
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
