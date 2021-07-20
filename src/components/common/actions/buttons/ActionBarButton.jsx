import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function ActionBarButton({action, iconClasses, popoverText, text, icon, className, size}) {
  return (
    <div className={className}>
      <TooltipWrapper innerText={popoverText}>
        <span className="action-bar-icon pointer" onClick={() => {action();}}>
          <FontAwesomeIcon size={size} icon={icon} className={iconClasses}/>
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
  size: PropTypes.string
};

ActionBarButton.defaultProps = {
  size: "lg"
};

export default ActionBarButton;