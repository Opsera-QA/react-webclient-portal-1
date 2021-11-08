import React  from "react";
import PropTypes from "prop-types";
import {faUserLock} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function RestrictedAccessBadge({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} badge-light`}
      icon={faUserLock}
      badgeText={badgeText}
    />
  );
}

RestrictedAccessBadge.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(RestrictedAccessBadge);