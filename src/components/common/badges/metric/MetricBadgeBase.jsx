import React  from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function MetricBadgeBase({icon, badgeText, className}) {
  const getClassNames = () => {
    let classNames = "metric-subheader-text";

    if (hasStringValue(className) === true) {
      classNames += ` ${className}`;
    }

    return classNames;
  };

  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      icon={icon}
      badgeText={badgeText}
      className={getClassNames()}
    />
  );
}

MetricBadgeBase.propTypes = {
  icon: PropTypes.object,
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(MetricBadgeBase);