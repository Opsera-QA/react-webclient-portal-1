import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import vaultActions from "components/vault/vault.actions";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolPipelinesTable from "components/inventory/tools/tool_details/ToolPipelinesTable";
import DestructiveDeleteConfirmationOverlay
  from "components/common/overlays/center/delete/DestructiveDeleteConfirmationOverlay";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {useHistory} from "react-router-dom";

function DeleteToolOverlay({ toolId, toolModel }) {
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(undefined);
  const [relevantPipelines, setRelevantPipelines] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(toolId) === true) {
      loadRelevantPipelines(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadRelevantPipelines = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await toolsActions.getRelevantPipelinesV2(getAccessToken, cancelSource, toolId);

      if (response?.data != null) {
        setRelevantPipelines(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
      toastContext.showSystemErrorToast(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteFunction = async () => {
    try {
      const vaultDeleteResponse = await vaultActions.deleteToolVaultKeys(getAccessToken, cancelTokenSource, toolId);

      if (vaultDeleteResponse?.status !== 200) {
        const errorMsg = `Error reported by services while deleting tool information from Vault. Please try again`;
        toastContext.showErrorDialog(errorMsg);
        return;
      }

      await toolsActions.deleteToolByIdV2(getAccessToken, cancelTokenSource, toolId);
      toastContext.showDeleteSuccessResultDialog("Tool");
      history.push("/inventory/tools");
      closePanel();
    } catch (error) {
      toastContext.showDeleteFailureResultDialog("Tool", error);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDeleteDetails = () => {
    return (
      <div className="mt-2">
        <div>
          <span>If you proceed with deleting this tool, the data will be permanently lost and these pipelines using this tool will break:</span>
        </div>
        <div>
          <ToolPipelinesTable
            isLoading={isLoading}
            toolModel={toolModel}
            pipelineData={relevantPipelines}
            loadData={loadRelevantPipelines}
          />
        </div>
      </div>
    );
  };

  return (
    <DestructiveDeleteConfirmationOverlay
      closePanel={closePanel}
      deleteTopic={"Tool"}
      handleDeleteFunction={handleDeleteFunction}
      deleteDetails={getDeleteDetails()}
    />
  );
}

DeleteToolOverlay.propTypes = {
  toolModel: PropTypes.object,
  toolId: PropTypes.string,
};

export default DeleteToolOverlay;


