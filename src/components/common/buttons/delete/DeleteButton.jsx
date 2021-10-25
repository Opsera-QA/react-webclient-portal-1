import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function DeleteButton({deleteRecord, dataObject, disabled, size, icon, className, buttonText}) {
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
    if (buttonText) {
      return buttonText;
    }

    if (isDeleting) {
      return (`Deleting ${dataObject.getType()}`);
    }

    return (`Delete ${dataObject.getType()}`);
  };

  return (
    <div className={className}>
      <TooltipWrapper innerText={cannotBeUndone}>
        <Button size={size} variant="danger" disabled={isDeleting || disabled} onClick={() => persistRecord()}>
          <span>
            <IconBase isLoading={isDeleting} icon={icon} fixedWidth className="mr-2"/>
            {getLabel()}
          </span>
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
  icon: PropTypes.object,
  buttonText: PropTypes.string,
};

DeleteButton.defaultProps = {
  // TODO: Change to md for default
  size: "sm",
  icon: faExclamationCircle
};

export default DeleteButton;