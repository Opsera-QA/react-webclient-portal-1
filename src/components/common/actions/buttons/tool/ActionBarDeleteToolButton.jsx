import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolPipelinesTable from "components/inventory/tools/tool_details/ToolPipelinesTable";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DestructiveDeleteModal from "components/common/modal/DestructiveDeleteModal";
import axios from "axios";
import vaultActions from "components/vault/vault.actions";

function ActionBarDeleteToolButton({ toolModel, className }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolModel]);


  const deleteObject = async () => {
    try {
      let vaultDeleteResponse = await vaultActions.deleteOwnerVaultRecordsForToolIdV2(getAccessToken, cancelTokenSource, toolModel);
      if (vaultDeleteResponse?.status !== 200) {
        const errorMsg = `Error reported by services while deleting tool information from Vault. Please try again`;
        toastContext.showErrorDialog(errorMsg);
        return;
      }
      await toolsActions.deleteToolV2(getAccessToken, cancelTokenSource, toolModel);
      toastContext.showDeleteSuccessResultDialog("Tool");
      setShowDeleteModal(false);
      history.push("/inventory/tools");
    } catch (error) {
      toastContext.showDeleteFailureResultDialog("Tool");
    }
  };

  const toggleDeleteModal = async () => {
    setShowDeleteModal(true);
    await loadRelevantPipelines();
  };

  const loadRelevantPipelines = async () => {
    if (toolModel?.getData("_id")) {
      try {
        setIsLoading(true);
        const response = await toolsActions.getRelevantPipelinesV2(getAccessToken, cancelTokenSource, toolModel);

        if (response?.data != null) {
          setRelevantPipelines(response?.data?.data);
        }
      }
      catch (error) {
        console.error(error);
        toastContext.showSystemErrorToast(error);
      }
      finally {
        if (isMounted?.current === true) {
          setIsLoading(false);
        }
      }
    }
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

  if (toolModel?.canPerformAction("delete_tool") !== true) {
    return <></>;
  }

  return (
    <>
      <ActionBarButton
        action={toggleDeleteModal}
        icon={faTrash}
        iconClasses={"danger-red"}
        popoverText={`Delete this Tool`}
        className={className}
      />
      <DestructiveDeleteModal
        deleteTopic={toolModel?.getData("name")}
        deleteDetails={getDeleteDetails()}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        dataObject={toolModel}
        handleDelete={deleteObject}
        modalSize={"lg"}
      />
    </>
  );
}

ActionBarDeleteToolButton.propTypes = {
  toolModel: PropTypes.object,
  className: PropTypes.string,
};

export default ActionBarDeleteToolButton;