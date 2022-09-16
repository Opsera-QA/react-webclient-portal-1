import React from "react";
import PropTypes from "prop-types";
import BadgeBase from "components/common/badges/BadgeBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

const getClassNames = (className) => {
  if (hasStringValue(className) === true) {
    return (`beta-badge ${className}`);
  }

  return "beta-badge";
};

function BetaBadge(
  {
    isBeta,
    className,
  }) {
  const classNames = getClassNames(className);

  if (isBeta !== true) {
    return null;
  }

  return (
    <BadgeBase
      badgeText={"Beta"}
      className={classNames}
    />
  );
}

BetaBadge.propTypes = {
  isBeta: PropTypes.bool,
  className: PropTypes.string,
};

export default React.memo(BetaBadge);