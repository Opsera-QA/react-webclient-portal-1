import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import DeleteConfirmationPanel from "components/common/panels/general/delete/DeleteConfirmationPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import InfoText from "components/common/inputs/info_text/InfoText";
import DeleteButton from "components/common/buttons/delete/DeleteButton";

function DeleteButtonWithInlineConfirmation({deleteRecord,  dataObject, disabled, size, icon, className}) {
  const toastContext = useContext(DialogToastContext);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [showDeleteConfirmationPanel, setShowDeleteConfirmationPanel] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const deleteDataFunction = async () => {
    try {
      let response = await deleteRecord();

      if (response) {
        toastContext.showDeleteSuccessResultDialog(dataObject.getType());
        setShowDeleteConfirmationPanel(false);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage(`Error deleting ${dataObject?.getType()}. Please check console log for more details`);
      }
    }
  };

  const handleClose = () => {
    if (isMounted?.current === true) {
      setShowDeleteConfirmationPanel(false);
      setErrorMessage("");
    }
  };

  const getBody = () => {
    if (showDeleteConfirmationPanel) {
      return (
        <DeleteConfirmationPanel
          model={dataObject}
          deleteDataFunction={deleteDataFunction}
          closePanelFunction={handleClose}
        />
      );
    }

    return (
      <DeleteButton
        deleteRecord={() => setShowDeleteConfirmationPanel(true)}
        dataObject={dataObject}
        size={size}
        disabled={disabled}
        icon={icon}
      />
    );
  };

  if (dataObject == null || dataObject?.isNew()) {
    return null;
  }

  return (
    <div className={className}>
      <div>{getBody()}</div>
      <InfoText errorMessage={errorMessage} />
    </div>
  );
}

DeleteButtonWithInlineConfirmation.propTypes = {
  dataObject: PropTypes.object,
  deleteRecord: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object
};


DeleteButtonWithInlineConfirmation.defaultProps = {
  size: "md",
  icon: faTrash
};

export default DeleteButtonWithInlineConfirmation;