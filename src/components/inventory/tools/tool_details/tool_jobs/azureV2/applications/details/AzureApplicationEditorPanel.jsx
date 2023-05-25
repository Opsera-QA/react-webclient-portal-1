import React, {useEffect, useContext, useState, useRef} from "react";
import { Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import azureActions from "../../azure-actions";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import VaultTextInput from "../../../../../../../common/inputs/text/VaultTextInput";
import toolsActions from "../../../../../tools-actions";
import DeleteButtonWithInlineConfirmation
  from "../../../../../../../common/buttons/delete/DeleteButtonWithInlineConfirmation";
import { generateUUID, hasStringValue } from "components/common/helpers/string-helpers";

function AzureApplicationEditorPanel({ azureApplicationData, toolData, applicationId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [azureApplicationModel, setAzureApplicationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if(azureApplicationData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [azureApplicationData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setAzureApplicationModel(azureApplicationData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = async () => {
    let newConfiguration = azureApplicationModel.getPersistData();
    const azureAppId = generateUUID();
    const vaultKeyPrefix = `${azureAppId}-${toolData?.getData("tool_identifier")}`;    
    newConfiguration.azureAppId = azureAppId;
    newConfiguration.clientId = await toolsActions.saveKeyPasswordToVault(azureApplicationModel, "clientId", 
      newConfiguration.clientId, `${vaultKeyPrefix}-clientId`, getAccessToken, toolData?.getData("_id"));
    newConfiguration.clientSecret = await toolsActions.saveKeyPasswordToVault(azureApplicationModel, "clientSecret", 
      newConfiguration.clientSecret, `${vaultKeyPrefix}-clientSecret`, getAccessToken, toolData?.getData("_id"));

    return await azureActions.createAzureCredential(getAccessToken, cancelTokenSource, toolData?.getData("_id"), newConfiguration);
  };

  const updateApplication = async () => {
    let newConfiguration = azureApplicationModel.getPersistData();
    // for existing applications
    if (!hasStringValue(newConfiguration?.azureAppId)) {
      const azureAppId = generateUUID();
      newConfiguration.azureAppId = azureAppId;
    }
    const vaultKeyPrefix = `${newConfiguration.azureAppId}-${toolData?.getData("tool_identifier")}`;
    newConfiguration.clientId = await toolsActions.saveKeyPasswordToVault(azureApplicationModel, "clientId", 
      newConfiguration.clientId, `${vaultKeyPrefix}-clientId`, getAccessToken, toolData?.getData("_id"));
    newConfiguration.clientSecret = await toolsActions.saveKeyPasswordToVault(azureApplicationModel, "clientSecret", 
      newConfiguration.clientSecret, `${vaultKeyPrefix}-clientSecret`, getAccessToken, toolData?.getData("_id"));
    return await azureActions.updateAzureCredential(getAccessToken, cancelTokenSource, toolData?.getData("_id"), applicationId, newConfiguration);
  };

  const deleteApplication = async () => {
    await azureActions.deleteAzureCredential(getAccessToken, cancelTokenSource, toolData?.getData("_id"), applicationId);
    handleClose();
  };

  if (isLoading || azureApplicationModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={azureApplicationModel}
      createRecord={createApplication}
      updateRecord={updateApplication}
      setRecordDto={setAzureApplicationModel}
      isLoading={isLoading}
      extraButtons={
        applicationId ?
        <DeleteButtonWithInlineConfirmation
          dataObject={azureApplicationModel}
          deleteRecord={deleteApplication}
        /> : undefined
      }
      handleClose={handleClose}
    >
      <div className="scroll-y hide-x-overflow">
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setAzureApplicationModel}
              dataObject={azureApplicationModel}
              fieldName={"credentialName"}
              disabled={!azureApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={azureApplicationModel}
              fieldName={"resource"}
              setDataObject={setAzureApplicationModel}
            />
          </Col>
          <Col lg={12}>
            <VaultTextInput
              dataObject={azureApplicationModel}
              fieldName={"clientId"}
              setDataObject={setAzureApplicationModel}
            />
          </Col>
          <Col lg={12}>
            <VaultTextInput
              dataObject={azureApplicationModel}
              fieldName={"clientSecret"}
              setDataObject={setAzureApplicationModel}
            />
          </Col>
          <Col lg={12}>
            <ActivityToggleInput
              setDataObject={setAzureApplicationModel}
              fieldName={"active"}
              dataObject={azureApplicationModel}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

AzureApplicationEditorPanel.propTypes = {
  azureApplicationData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.string,
  handleClose: PropTypes.func
};

export default AzureApplicationEditorPanel;
