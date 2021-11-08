import React  from "react";
import PropTypes from "prop-types";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CustomBadge from "components/common/badges/CustomBadge";

function TagBadgeBase({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <CustomBadge
      className={`${className} badge-light group-badge`}
      icon={faTag}
      badgeText={badgeText}
    />
  );
}

TagBadgeBase.propTypes = {
  badgeText: PropTypes.string,
  className: PropTypes.string
};

export default React.memo(TagBadgeBase);