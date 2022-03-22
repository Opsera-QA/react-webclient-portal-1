import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter, truncateString } from "components/common/helpers/string-helpers";
import FiltersBadgeBase from "components/common/badges/tag/FiltersBadgeBase";

function FiltersBadge({ tag, className }) {
  return <FiltersBadgeBase className={className} badgeText={`${capitalizeFirstLetter(tag)}`} />;
}

FiltersBadge.propTypes = {
  tag: PropTypes.object,
  className: PropTypes.string,
};

export default React.memo(FiltersBadge);
