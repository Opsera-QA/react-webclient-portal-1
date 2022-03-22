import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter, truncateString } from "components/common/helpers/string-helpers";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";
import FiltersBadgeBase from "components/common/badges/tag/FiltersBadgeBase";

function FiltersBadge({ tag, className }) {
  return <FiltersBadgeBase className={className} badgeText={`${capitalizeFirstLetter(tag?.name)}`} />;
}

FiltersBadge.propTypes = {
  tag: PropTypes.object,
  className: PropTypes.string,
};

export default React.memo(FiltersBadge);
