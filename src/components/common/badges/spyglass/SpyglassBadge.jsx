import React  from "react";
import PropTypes from "prop-types";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function SpyglassBadge({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} badge-light group-badge`}
      icon={faSearch}
      badgeText={badgeText}
    />
  );
}

SpyglassBadge.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(SpyglassBadge);