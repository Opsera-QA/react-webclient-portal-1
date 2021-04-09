import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import DeleteModal from "components/common/modal/DeleteModal";
import {AuthContext} from "contexts/AuthContext";

function ActionBarOpseraAdminDeleteButton({handleDelete, relocationPath, dataObject, className}) {
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isMounted = useRef(false);
  const [accessRoleData, setAccessRoleData] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    getRoles().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const deleteObject = async () => {
    try {
      let result = await handleDelete();

      if (result) {
        if (result?.error == null) {
          toastContext.showDeleteSuccessResultDialog(dataObject.getType());
          setShowDeleteModal(false);

          if (relocationPath) {
            history.push(relocationPath);
          }
        }
        else
        {
          toastContext.showDeleteFailureResultDialog(dataObject.getType(), result.error);
        }
      }
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(dataObject.getType());
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  if (accessRoleData == null || !accessRoleData?.OpseraAdministrator) {
    return null;
  }

  return (
    <div className={className}>
      <ActionBarButton action={toggleDeleteModal} icon={faTrash} iconClasses={"danger-red"} popoverText={`Delete this ${dataObject.getType()}`} />
      <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} dataObject={dataObject} handleDelete={deleteObject} />
    </div>
  );
}

ActionBarOpseraAdminDeleteButton.propTypes = {
  handleDelete: PropTypes.func,
  relocationPath: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
};

export default ActionBarOpseraAdminDeleteButton;