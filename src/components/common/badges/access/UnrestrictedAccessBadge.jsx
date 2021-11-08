import React  from "react";
import PropTypes from "prop-types";
import {faLock} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function UnrestrictedAccessBadge({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} badge-light`}
      icon={faLock}
      badgeText={badgeText}
    />
  );
}

UnrestrictedAccessBadge.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(UnrestrictedAccessBadge);