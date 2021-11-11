import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function BadgeBase({icon, badgeText, className}) {
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
    <span className={`badge ${className}`}>
      <span>{getIcon()}{badgeText}</span>
    </span>
  );
}

BadgeBase.propTypes = {
  icon: PropTypes.object,
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(BadgeBase);