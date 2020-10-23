import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import DeleteModal from "../../modal/DeleteModal";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {useHistory} from "react-router-dom";

// TODO: This will supersede the other delete button
function ActionBarDeleteButton2({handleDelete, relocationPath, dataObject}) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteObject = () => {
    setShowDeleteModal(false);
    try {
      handleDelete();
      toastContext.showDeleteSuccessResultDialog("Pipeline Template");
      setShowDeleteModal(false);
      history.push(relocationPath);
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog("Pipeline Template");
    }
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(true);
  }

  return (
    <>
      <ActionBarButton action={toggleDeleteModal} icon={faTrash} iconClasses={"danger-red"} popoverText={`Delete this ${dataObject.getType()}`} />
      <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} dataObject={dataObject} handleDelete={deleteObject} />
    </>
  );
}

ActionBarDeleteButton2.propTypes = {
  handleDelete: PropTypes.func,
  relocationPath: PropTypes.string,
  dataObject: PropTypes.object
};

export default ActionBarDeleteButton2;