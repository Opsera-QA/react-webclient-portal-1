import PropTypes from "prop-types";
import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

export default function OrchestrationStateBase(
  {
    icon,
    innerText,
    statusText,
    showStatusText,
    className,
    colorClassName,
  }) {
  const getStatusText = () => {
    if (showStatusText !== false) {
      return (
        <span>{statusText}</span>
      );
    }
  };

  return (
    <span className={className}>
      <TooltipWrapper innerText={innerText}>
        <div className={"d-flex flex-nowrap"}>
          <span>{getStatusText()}</span>
          <IconBase
            iconSize={"lg"}
            icon={icon}
            spinIcon={statusText === "Running"}
            className={`my-auto ml-2 ${colorClassName}`}
          />
        </div>
      </TooltipWrapper>
    </span>
  );
}

OrchestrationStateBase.propTypes = {
  icon: PropTypes.object,
  innerText: PropTypes.string,
  statusText: PropTypes.string,
  showStatusText: PropTypes.bool,
  className: PropTypes.string,
  colorClassName: PropTypes.string,
};