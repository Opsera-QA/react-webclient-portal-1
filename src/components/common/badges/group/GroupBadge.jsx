import React  from "react";
import PropTypes from "prop-types";
import {faUserFriends} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function GroupBadge({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} badge-light group-badge`}
      icon={faUserFriends}
      badgeText={badgeText}
    />
  );
}

GroupBadge.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(GroupBadge);