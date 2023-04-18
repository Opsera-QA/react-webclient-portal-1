import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import DestructiveDeleteModal from "../../modal/DestructiveDeleteModal";
import useComponentStateReference from "hooks/useComponentStateReference";

function ActionBarDestructiveDeleteButton({handleDelete, relocationPath, dataObject, deleteTopic, mustBeOpseraAdmin}) {
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    isOpseraAministrator,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => { }, [isOpseraAministrator]);

  const deleteObject = async () => {
    try {
      let result = await handleDelete();

      if (result.error == null) {
        toastContext.showDeleteSuccessResultDialog(dataObject.getType());
        setShowDeleteModal(false);
        history.push(relocationPath);
      }
      else
      {
        toastContext.showDeleteFailureResultDialog(dataObject.getType(), result.error);
      }
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(dataObject.getType());
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  if (isOpseraAministrator !== true && mustBeOpseraAdmin) {
    return <></>;
  }

  return (
    <>
      <ActionBarButton action={toggleDeleteModal} icon={faTrash} iconClasses={"danger-red"} popoverText={`Delete this ${dataObject.getType()}`} />
      <DestructiveDeleteModal deleteTopic={deleteTopic} showModal={showDeleteModal} setShowModal={setShowDeleteModal} dataObject={dataObject} handleDelete={deleteObject} />
    </>
  );
}

ActionBarDestructiveDeleteButton.propTypes = {
  handleDelete: PropTypes.func,
  relocationPath: PropTypes.string,
  deleteTopic: PropTypes.string,
  dataObject: PropTypes.object,
  mustBeOpseraAdmin: PropTypes.bool
};

ActionBarDestructiveDeleteButton.defaultProps = {
  mustBeOpseraAdmin: true
};

export default ActionBarDestructiveDeleteButton;