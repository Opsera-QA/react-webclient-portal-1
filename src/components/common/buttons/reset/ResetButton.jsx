import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faHistory} from "@fortawesome/pro-light-svg-icons";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function ResetButton(
  {
    model,
    resetFunction,
    isLoading,
    disabled,
    size,
    icon,
    className,
    label,
  }) {
  const [isResetting, setIsResetting] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const resetData = async () => {
    setIsResetting(true);
    await resetFunction();

    if (isMounted?.current === true) {
      setIsResetting(false);
    }
  };

  const getLabel = () => {
    if (label) {
      return label;
    }

    if (isResetting) {
      return (`Resetting ${model?.getType()}`);
    }

    return (`Reset ${model?.getType()}`);
  };

  return (
    <div className={className}>
      <TooltipWrapper innerText={cannotBeUndone}>
        <Button
          size={size}
          variant={"warning"}
          disabled={isResetting || isLoading || disabled}
          onClick={() => resetData()}
        >
          <span>
            <IconBase isLoading={isResetting} icon={icon} fixedWidth className="mr-2"/>
            {getLabel()}
          </span>
        </Button>
      </TooltipWrapper>
    </div>
  );
}

ResetButton.propTypes = {
  model: PropTypes.object,
  resetFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
};

ResetButton.defaultProps = {
  icon: faHistory,
};

export default ResetButton;