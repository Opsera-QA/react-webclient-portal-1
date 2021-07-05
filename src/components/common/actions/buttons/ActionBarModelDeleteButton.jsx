import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import DeleteModal from "components/common/modal/DeleteModal";

function ActionBarModelDeleteButton({relocationPath, visible, model, className}) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteObject = async () => {
    try {
      let result = await model?.deleteModel();

      if (result) {
        if (result?.error == null) {
          toastContext.showDeleteSuccessResultDialog(model.getType());
          setShowDeleteModal(false);

          if (relocationPath) {
            history.push(relocationPath);
          }
          else if (model?.getManagementScreenLink() != null) {
            history.push(model?.getManagementScreenLink());
          }
        }
        else
        {
          toastContext.showDeleteFailureResultDialog(model.getType(), result.error);
        }
      }
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(model.getType());
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  if (model == null || model?.canDelete() !== true || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <ActionBarButton action={toggleDeleteModal} icon={faTrash} iconClasses={"danger-red"} popoverText={`Delete this ${model.getType()}`} />
      <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} dataObject={model} handleDelete={deleteObject} />
    </div>
  );
}

ActionBarModelDeleteButton.propTypes = {
  relocationPath: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool
};

export default ActionBarModelDeleteButton;