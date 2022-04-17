import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import githubDeployKeysActions from "../github-deploykeys-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";

function GithubDeployKeysEditorPanel({ githubDeployKeyData, toolData, repoId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [githubDeployKeyModel, setGithubDeployKeyModel] = useState(undefined);
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

    if(githubDeployKeyData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [githubDeployKeyData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setGithubDeployKeyModel(githubDeployKeyData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createRepository = async () => {
    let newConfiguration = githubDeployKeyModel.getPersistData();
    const deployKeyVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.deployKey = await toolsActions.saveKeyPasswordToVault(githubDeployKeyModel, "deployKey", newConfiguration.deployKey, deployKeyVaultKey, getAccessToken, toolData.getData("_id"));
    return await githubDeployKeysActions.createGithubDeployKey(getAccessToken, cancelTokenSource, toolData?._id, newConfiguration);
  };

  const updateRepository = async () => {
    return await githubDeployKeysActions.updateGithubDeployKey(getAccessToken, cancelTokenSource, toolData?._id, repoId, githubDeployKeyModel);
  };

  const deleteRepository = async () => {
    await githubDeployKeysActions.deleteGithubDeployKey(getAccessToken, cancelTokenSource, toolData?._id, repoId);
    handleClose();
  };

  if (isLoading || githubDeployKeyModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={githubDeployKeyModel}
      createRecord={createRepository}
      updateRecord={updateRepository}
      setRecordDto={setGithubDeployKeyModel}
      isLoading={isLoading}
      extraButtons={
        <DeleteButtonWithInlineConfirmation
          dataObject={githubDeployKeyModel}
          deleteRecord={deleteRepository}
        />
      }
      handleClose={handleClose}
    >
      <div>
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setGithubDeployKeyModel}
              dataObject={githubDeployKeyModel}
              fieldName={"name"}
              disabled={!githubDeployKeyData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setGithubDeployKeyModel}
              dataObject={githubDeployKeyModel}
              fieldName={"sshUrl"}
              disabled={!githubDeployKeyData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <VaultTextAreaInput
              setDataObject={setGithubDeployKeyModel}
              dataObject={githubDeployKeyModel}
              fieldName={"deployKey"}
              disabled={!githubDeployKeyData?.isNew()}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

GithubDeployKeysEditorPanel.propTypes = {
  githubDeployKeyData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  repoId: PropTypes.string,
  handleClose: PropTypes.func
};

export default GithubDeployKeysEditorPanel;
