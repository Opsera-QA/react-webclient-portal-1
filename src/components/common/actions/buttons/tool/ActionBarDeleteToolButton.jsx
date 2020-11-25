import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {AuthContext} from "../../../../../contexts/AuthContext";
import ActionBarButton from "../ActionBarButton";
import DestructiveDeleteModal from "../../../modal/DestructiveDeleteModal";
import toolsActions from "../../../../inventory/tools/tools-actions";

function ActionBarDeleteToolButton({ toolDataObject }) {
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

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
    }
  };

  const deleteObject = async () => {
    try {
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
        <span>If you proceed with deleting this tool, the data will be permanently lost and any pipelines using this tool will break.</span>
      </div>
    );
  };

  if (isLoading || !canDelete) {
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
        handleDelete={deleteObject} />
    </>
  );
}

ActionBarDeleteToolButton.propTypes = {
  relocationPath: PropTypes.string,
  deleteTopic: PropTypes.string,
  toolDataObject: PropTypes.object,
};

export default ActionBarDeleteToolButton;