import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function DeleteButton({deleteRecord, dataObject, disabled, size, icon, className}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const persistRecord = async () => {
    setIsDeleting(true);
    await deleteRecord();

    if (isMounted?.current === true) {
      setIsDeleting(false);
    }
  };

  const getLabel = () => {
    if (isDeleting) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>{`Deleting ${dataObject.getType()}`}</span>);
    }

    return (<span><FontAwesomeIcon icon={icon} fixedWidth className="mr-2"/>{`Delete ${dataObject.getType()}`}</span>);
  };

  return (
    <div className={className}>
      <TooltipWrapper innerText={cannotBeUndone}>
        <Button size={size} variant="danger" disabled={isDeleting || disabled} onClick={() => persistRecord()}>
          {getLabel()}
        </Button>
      </TooltipWrapper>
    </div>
  );
}

DeleteButton.propTypes = {
  dataObject: PropTypes.object,
  deleteRecord: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object
};


DeleteButton.defaultProps = {
  size: "sm",
  icon: faExclamationCircle
};

export default DeleteButton;