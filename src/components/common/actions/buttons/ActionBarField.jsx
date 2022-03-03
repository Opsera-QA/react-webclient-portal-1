import React  from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function ActionBarField({iconClasses, popoverText, text, icon}) {
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
      <span className="action-bar-icon">
        <IconBase iconSize={"lg"} icon={icon} iconClassName={iconClasses}/>
        <span>{text}</span></span>
    </OverlayTrigger>
  );
}

ActionBarField.propTypes = {
  icon: PropTypes.object,
  popoverText: PropTypes.string,
  iconClasses: PropTypes.string,
  text: PropTypes.string
};

export default ActionBarField;