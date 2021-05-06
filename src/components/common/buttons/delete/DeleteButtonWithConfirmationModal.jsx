import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import DeleteModal from "components/common/modal/DeleteModal";
import IconBase from "components/common/icons/IconBase";

function DeleteButtonWithConfirmation({deleteRecord, dataObject, disabled, size, icon, className}) {
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
    await deleteRecord();

    if (isMounted?.current === true) {
      setIsDeleting(false);
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

DeleteButtonWithConfirmation.propTypes = {
  dataObject: PropTypes.object,
  deleteRecord: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object
};


DeleteButtonWithConfirmation.defaultProps = {
  size: "md",
  icon: faTrash
};

export default DeleteButtonWithConfirmation;