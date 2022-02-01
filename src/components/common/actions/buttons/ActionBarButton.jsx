import React  from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function ActionBarButton(
  {
    action,
    iconClasses,
    popoverText,
    text,
    icon,
    className,
    size,
    isBusy,
  }) {
  return (
    <div className={className}>
      <TooltipWrapper innerText={popoverText}>
        <span className={"action-bar-icon pointer"}>
          <IconBase
            iconSize={size}
            icon={icon}
            iconClassName={iconClasses}
            onClickFunction={action}
            isLoading={isBusy}
          />
          <span>{text}</span>
        </span>
      </TooltipWrapper>
    </div>
  );
}

ActionBarButton.propTypes = {
  action: PropTypes.func,
  icon: PropTypes.object,
  popoverText: PropTypes.string,
  iconClasses: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  isBusy: PropTypes.bool
};

ActionBarButton.defaultProps = {
  size: "lg"
};

export default ActionBarButton;