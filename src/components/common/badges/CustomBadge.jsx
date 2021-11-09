import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function CustomBadge({icon, badgeText, className}) {
  const getIcon = () => {
    if (icon) {
      return (
        <IconBase
          icon={icon}
          className={"mr-1"}
        />
      );
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