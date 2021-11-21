import React  from "react";
import PropTypes from "prop-types";
import {capitalizeFirstLetter, truncateString} from "components/common/helpers/string-helpers";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";

function TagBadge({tag, className}) {
  return (
    <TagBadgeBase
      className={className}
      badgeText={`${capitalizeFirstLetter(tag?.type)}: ${truncateString(tag?.value, 50)}`}
    />
  );
}

TagBadge.propTypes = {
  tag: PropTypes.object,
  className: PropTypes.string
};

export default React.memo(TagBadge);