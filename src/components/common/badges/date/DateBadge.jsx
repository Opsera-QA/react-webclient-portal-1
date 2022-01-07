import React  from "react";
import PropTypes from "prop-types";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function DateBadge({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} date-badge`}
      icon={faCalendar}
      badgeText={badgeText}
    />
  );
}

DateBadge.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(DateBadge);