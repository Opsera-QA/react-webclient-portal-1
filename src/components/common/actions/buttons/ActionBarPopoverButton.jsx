import React  from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ActionBarPopoverButton({iconClasses, popoverText, text, icon}) {
  // TODO: Move to helper
  const renderTooltip = (message) => {
    return (
      <Tooltip id="button-tooltip">
        {message}
      </Tooltip>
    );
  };

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip(popoverText)}>
      <span className="action-bar-icon pointer">
          <span><FontAwesomeIcon size={"lg"} icon={icon} className={iconClasses}/><span>{text}</span></span>
      </span>
    </OverlayTrigger>
  );
}

ActionBarPopoverButton.propTypes = {
  icon: PropTypes.object,
  popoverText: PropTypes.string,
  iconClasses: PropTypes.string,
  text: PropTypes.string
};

export default ActionBarPopoverButton;