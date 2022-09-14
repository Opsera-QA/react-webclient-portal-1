import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function ActionBarPopoverButton(
  {
    iconClasses,
    popoverText,
    text,
    icon,
    className,
  }) {
  return (
    <TooltipWrapper innerText={popoverText}>
      <span className={"action-bar-icon pointer"}>
          <span className={className}>
            <IconBase
              iconSize={"lg"}
              icon={icon}
              iconClassName={iconClasses}
            />
            <span>{text}</span>
          </span>
      </span>
    </TooltipWrapper>
  );
}

ActionBarPopoverButton.propTypes = {
  icon: PropTypes.object,
  popoverText: PropTypes.string,
  iconClasses: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};