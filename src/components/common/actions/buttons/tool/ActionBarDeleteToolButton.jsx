import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {AuthContext} from "../../../../../contexts/AuthContext";
import ActionBarButton from "../ActionBarButton";
import DestructiveDeleteModal from "../../../modal/DestructiveDeleteModal";
import toolsActions from "../../../../inventory/tools/tools-actions";
import ToolPipelinesTable from "../../../../inventory/tools/tool_details/ToolPipelinesTable";

// TODO: Every load of the tool page loads these relevant pipelines, but the tab runs a separate query.
//  Make sure to pull the relevant pipeline call inside the detail view instead and pass to both the delete button and the pipelines tab
function ActionBarDeleteToolButton({ toolDataObject }) {
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [relevantPipelines, setRelevantPipelines] = useState([]);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    setIsLoading(true);
    await getRoles();
    setIsLoading(false);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setCanDelete(userRoleAccess.OpseraAdministrator || userRoleAccess.Administrator || toolDataObject.getData("owner") === user._id);
      await loadRelevantPipelines();
    }
  };

  const loadRelevantPipelines = async () => {
    const response = await toolsActions.getRelevantPipelines(toolDataObject, getAccessToken);

    if (response?.data != null) {
      setRelevantPipelines(response?.data?.data);
    }
  };

  const deleteObject = async () => {
    try {
      let vaultDeleteResponse = await toolsActions.deleteVaultRecordsForToolId(toolDataObject, getAccessToken)
      if (vaultDeleteResponse.status !== 200) {
        const errorMsg = `Error reported by services while deleting tool information from Vault. Please try again`;
        toastContext.showErrorDialog(errorMsg);
        return
      }
      let result = await toolsActions.deleteTool(toolDataObject, getAccessToken);
      toastContext.showDeleteSuccessResultDialog("Tool");
      setShowDeleteModal(false);
      history.push("/inventory/tools");
    } catch (error) {
      toastContext.showDeleteFailureResultDialog("Tool");
    }
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(true);
  }

  const getDeleteDetails = () => {
    return (
      <div className="mt-2">
        <div>
          <span>If you proceed with deleting this tool, the data will be permanently lost and these pipelines using this tool will break:</span>
        </div>
        <div>
          <ToolPipelinesTable isLoading={isLoading} data={relevantPipelines} />
        </div>
      </div>
    );
  };

  if (!canDelete) {
    return <></>;
  }

  return (
    <>
      <ActionBarButton action={toggleDeleteModal} icon={faTrash} iconClasses={"danger-red"} popoverText={`Delete this Tool`} />
      <DestructiveDeleteModal
        deleteTopic={toolDataObject.getData("name")}
        deleteDetails={getDeleteDetails()}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        dataObject={toolDataObject}
        handleDelete={deleteObject}
        modalSize={"lg"}
      />
    </>
  );
}

ActionBarDeleteToolButton.propTypes = {
  relocationPath: PropTypes.string,
  deleteTopic: PropTypes.string,
  toolDataObject: PropTypes.object,
};

export default ActionBarDeleteToolButton;