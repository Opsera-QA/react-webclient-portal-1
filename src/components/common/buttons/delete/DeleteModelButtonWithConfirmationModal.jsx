import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import DeleteModal from "components/common/modal/DeleteModal";
import IconBase from "components/common/icons/IconBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function DeleteModelButtonWithConfirmation({dataObject, disabled, size, icon, className}) {
  const toastContext = useContext(DialogToastContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMounted = useRef(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await dataObject.deleteModel();
      toastContext.showDeleteSuccessResultDialog(dataObject?.getType());
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(dataObject?.getType(), error);
      console.error(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsDeleting(false);
        setShowDeleteModal(false);
      }
    }
  };

  return (
    <div className={className}>
      <TooltipWrapper innerText={cannotBeUndone}>
        <Button size={size} variant="danger" disabled={isDeleting || disabled} onClick={() => setShowDeleteModal(true)}>
          <span>
            <IconBase icon={icon} isLoading={isDeleting} className="mr-2" fixedWidth />
            {isDeleting ? `Deleting ${dataObject.getType()}` : `Delete ${dataObject.getType()}`}
          </span>
        </Button>
      </TooltipWrapper>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        dataObject={dataObject}
        handleDelete={handleDelete}
      />
    </div>
  );
}

DeleteModelButtonWithConfirmation.propTypes = {
  dataObject: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object
};


DeleteModelButtonWithConfirmation.defaultProps = {
  size: "md",
  icon: faTrash
};

export default DeleteModelButtonWithConfirmation;