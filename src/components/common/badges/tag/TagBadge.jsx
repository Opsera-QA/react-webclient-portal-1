import React  from "react";
import PropTypes from "prop-types";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";

function TagBadge({tag, className}) {
  if (tag == null || typeof tag !== "object") {
    return null;
  }

  return (
    <TagBadgeBase
      className={className}
      badgeText={`${capitalizeFirstLetter(tag?.type)}: ${capitalizeFirstLetter(tag?.value)}`}
    />
  );
}

TagBadge.propTypes = {
  tag: PropTypes.object,
  className: PropTypes.string
};

export default React.memo(TagBadge);