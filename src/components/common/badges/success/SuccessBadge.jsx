import React  from "react";
import PropTypes from "prop-types";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function SuccessBadge({badgeText, className}) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} badge-light group-badge`}
      icon={faCheckCircle}
      badgeText={badgeText}
    />
  );
}

SuccessBadge.propTypes = {
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(SuccessBadge);