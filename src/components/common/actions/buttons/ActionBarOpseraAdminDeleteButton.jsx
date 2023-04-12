import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import DeleteModal from "components/common/modal/DeleteModal";
import useComponentStateReference from "hooks/useComponentStateReference";

function ActionBarOpseraAdminDeleteButton({handleDelete, relocationPath, dataObject, className}) {
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    isOpseraAdministrator,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {}, []);

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

  if (isOpseraAdministrator !== true) {
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