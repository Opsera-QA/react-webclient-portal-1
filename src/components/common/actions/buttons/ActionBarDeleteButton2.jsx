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

  const deleteObject = async () => {
    try {
      let result = await handleDelete();

      console.log("result: " + JSON.stringify(result));
      if (result) {
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
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(dataObject.getType());
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