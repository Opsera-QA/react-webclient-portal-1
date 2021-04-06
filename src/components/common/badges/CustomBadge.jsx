import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function CustomBadge({icon, badgeText, className}) {
  const getIcon = () => {
    if (icon) {
      return (<FontAwesomeIcon icon={icon} fixedWidth className="mr-1"/>);
    }
  };

  if (badgeText == null || badgeText === "") {
    return null;
  }

  return (
    <span className={`custom-badge ${className}`}>
      <span>{getIcon()}{badgeText}</span>
    </span>
  );
}

CustomBadge.propTypes = {
  icon: PropTypes.object,
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(CustomBadge);