import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import DeleteConfirmationPanel from "components/common/panels/general/delete/DeleteConfirmationPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function DeleteButtonWithInlineConfirmation({deleteRecord,  dataObject, disabled, size, icon, className}) {
  const toastContext = useContext(DialogToastContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMounted = useRef(false);
  const [showDeleteConfirmationPanel, setShowDeleteConfirmationPanel] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    let response = await deleteRecord();

    if (response) {
      toastContext.showDeleteSuccessResultDialog(dataObject.getType());
      setShowDeleteConfirmationPanel(false);
    }

    if (isMounted?.current === true) {
      setIsDeleting(false);
    }
  };

  if (showDeleteConfirmationPanel) {
    return (
      <DeleteConfirmationPanel
        dataObject={dataObject}
        handleDelete={handleDelete}
        setShowDeleteConfirmationPanel={setShowDeleteConfirmationPanel}
        showDeleteConfirmationPanel={showDeleteConfirmationPanel}
      />
    );
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={cannotBeUndone}>
        <Button size={size} variant="danger" disabled={isDeleting || disabled} onClick={() => setShowDeleteConfirmationPanel(true)}>
          <span>
            <IconBase icon={icon} isLoading={isDeleting} className="mr-2" fixedWidth />
            {isDeleting ? `Deleting ${dataObject.getType()}` : `Delete ${dataObject.getType()}`}
          </span>
        </Button>
      </TooltipWrapper>
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