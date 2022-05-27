import React  from "react";
import PropTypes from "prop-types";
import BadgeBase from "components/common/badges/BadgeBase";

function BetaBadge({isBeta}) {

  if (isBeta !== true) {
    return null;
  }

  return (
    <BadgeBase
      badgeText={"Beta"}
      className={"beta-badge mr-1 ml-2 my-auto"}
    />
  );
}

BetaBadge.propTypes = {
  isBeta: PropTypes.bool,
};

export default React.memo(BetaBadge);