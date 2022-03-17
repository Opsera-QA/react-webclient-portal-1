import React  from "react";
import PropTypes from "prop-types";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function DateBadgeBase({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={className}
      icon={faCalendar}
      badgeText={badgeText}
    />
  );
}

DateBadgeBase.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(DateBadgeBase);