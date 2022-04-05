import React from "react";
import PropTypes from "prop-types";
import FiltersBadgeBase from "components/common/badges/tag/FiltersBadgeBase";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import { hasStringValue } from "components/common/helpers/string-helpers";
import AppliedFiltersOverlay from "components/common/fields/multiple_items/tags/AppliedFiltersOverlay";

function AppliedFiltersBadge({ tags, tagLocation, className, showNoTagsAppliedBadge }) {
  const getTagLabel = () => {
    let tagText = `${tags?.svp.length} `;
    if (hasStringValue(tagLocation) === true) {
      tagText += `${tagLocation} `;
    }

    return tagText + (tags?.svp.length !== 1 ? "Filters Applied" : "Filter Applied");
  };

  if (!Array.isArray(tags.svp) || tags.svp.length === 0) {
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <FiltersBadgeBase
            className={"metric-badge"}
            badgeText={`No ${tagLocation ? `${tagLocation} ` : ""}Filters Applied`}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <AppliedFiltersOverlay className={className} tags={tags}>
      <SpyglassBadge className={"metric-badge"} badgeText={getTagLabel()} />
    </AppliedFiltersOverlay>
  );
}

AppliedFiltersBadge.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
  tagLocation: PropTypes.string,
};

export default AppliedFiltersBadge;
