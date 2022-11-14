import React from "react";
import PropTypes from "prop-types";
import {faPencil} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function EnableEditingIcon (
  {
    enableEditingFunction,
    disabled,
    isLoading,
    className,
  }) {
  const handleLoadData = async () => {
    if (disabled === true || isLoading === true) {
      return;
    }

    await enableEditingFunction();
  };

  const getLabel = () => {
    return "Enable Editing";
  };

  const getClassName = () => {
    if (isLoading === true || disabled === true) {
      return "my-auto badge badge-info clear-value-badge disabled";
    }

    return "my-auto badge badge-info clear-value-badge pointer";
  };

  const getStyle = () => {
    if (isLoading === true) {
      return ({
        opacity: .5,
      });
    }
  };

  if (disabled === true || enableEditingFunction == null) {
    return null;
  }

  return (
    <span className={className}>
      <TooltipWrapper
        innerText={"This setting "}
      >
        <div>
          <span
            onClick={() => handleLoadData()}
            className={getClassName()}
            style={getStyle()}
          >
        <span className={"my-auto"}>
          <IconBase
            icon={faPencil}
            className={"mr-1"}
          />
          {getLabel()}
        </span>
      </span>
        </div>
      </TooltipWrapper>
    </span>
  );
}

EnableEditingIcon.propTypes = {
  enableEditingFunction: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};