import React  from "react";
import PropTypes from "prop-types";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function UserBadge({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} badge-light user-badge`}
      icon={faUser}
      badgeText={badgeText}
    />
  );
}

UserBadge.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(UserBadge);