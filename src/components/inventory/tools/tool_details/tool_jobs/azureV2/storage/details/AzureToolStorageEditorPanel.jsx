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


function AzureStorageEditorPanel({ azureStorageAccountsModel, setAzureStorageAccountsModel, toolId, handleClose }) {
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

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createAzureStorage = async () => {
    let newConfiguration = azureStorageAccountsModel.getPersistData();
    // const response = await azureStorageActions.createAzureStorage(getAccessToken, cancelTokenSource, toolData?._id, newConfiguration);
    handleClose();
    return;
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
      createRecord={createAzureStorage}
      updateRecord={createAzureStorage}
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
            fieldName={"storageName"}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            dataObject={azureStorageAccountsModel}
            setDataObject={setAzureStorageAccountsModel}            
            fieldName={"storageAccessToken"}
          />
        </Col>
      </Row>      
    </EditorPanelContainer>
  );
}

AzureStorageEditorPanel.propTypes = {
  azureStorageAccountsModel: PropTypes.object,
  setAzureStorageAccountsModel: PropTypes.func,
  toolId: PropTypes.string,
  handleClose: PropTypes.func,
};

export default AzureStorageEditorPanel;
