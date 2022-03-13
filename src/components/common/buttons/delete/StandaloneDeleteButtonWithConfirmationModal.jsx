import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import DeleteModal from "components/common/modal/DeleteModal";
import IconBase from "components/common/icons/IconBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function StandaloneDeleteButtonWithConfirmationModal(
  {
    model,
    disabled,
    size,
    icon,
    className,
    deleteDataFunction,
    handleCloseFunction,
  }) {
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
      const response = await deleteDataFunction();
      toastContext.showDeleteSuccessResultDialog(model?.getType());

      if (handleCloseFunction) {
        handleCloseFunction();
      }
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(model?.getType(), error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsDeleting(false);
        setShowDeleteModal(false);
      }
    }
  };

  if (model == null || model?.isNew() !== false) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={cannotBeUndone}>
        <Button size={size} variant="danger" disabled={isDeleting || disabled} onClick={() => setShowDeleteModal(true)}>
          <span>
            <IconBase icon={icon} isLoading={isDeleting} className="mr-2" fixedWidth />
            {isDeleting ? `Deleting ${model.getType()}` : `Delete ${model.getType()}`}
          </span>
        </Button>
      </TooltipWrapper>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        dataObject={model}
        handleDelete={handleDelete}
      />
    </div>
  );
}

StandaloneDeleteButtonWithConfirmationModal.propTypes = {
  model: PropTypes.object,
  deleteDataFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object,
  handleCloseFunction: PropTypes.func,
};


StandaloneDeleteButtonWithConfirmationModal.defaultProps = {
  size: "md",
  icon: faTrash
};

export default StandaloneDeleteButtonWithConfirmationModal;