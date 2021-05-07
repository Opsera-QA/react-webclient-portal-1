import React from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import TitleBar from "components/common/fields/TitleBar";
import CancelButton from "components/common/buttons/CancelButton";

function DeleteConfirmationPanel({ dataObject, showDeleteConfirmationPanel, setShowDeleteConfirmationPanel, handleDelete }) {
  const handleClose = () => {
    setShowDeleteConfirmationPanel(false);
  };

  if (showDeleteConfirmationPanel !== true) {
    return null;
  }

  return (
    <div className={"filter-container content-container"}>
      <div className="px-2 py-1 filter-title-bar content-block-header title-text-header-1">
        <TitleBar title={`Confirm ${dataObject.getType()} Delete`} titleIcon={faTrash}/>
      </div>
      <div className="m-3">
        <div className="mb-2">
          <div>Data cannot be recovered once this {dataObject.getType()} is deleted.</div>
          <div>Do you still want to proceed?</div>
        </div>
        <SaveButtonContainer>
          <CancelButton className={"mx-2"} cancelFunction={handleClose} />
          <DeleteButton dataObject={dataObject} deleteRecord={handleDelete}/>
        </SaveButtonContainer>
      </div>
    </div>
  );
}

DeleteConfirmationPanel.propTypes = {
  dataObject: PropTypes.object,
  showDeleteConfirmationPanel: PropTypes.bool,
  setShowDeleteConfirmationPanel: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DeleteConfirmationPanel;


