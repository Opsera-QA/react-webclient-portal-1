import React from "react";
import PropTypes from "prop-types";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import {hasStringValue} from "components/common/helpers/string-helpers";
import AppliedTagOverlay from "components/common/fields/multiple_items/tags/AppliedTagOverlay";

function AppliedTagBadge({tags, tagLocation, className, showNoTagsAppliedBadge}) {
  const getTagLabel = () => {
    let tagText = `${tags?.length} `;

    if (hasStringValue(tagLocation) === true) {
      tagText += `${tagLocation} `;
    }

    return tagText + (tags?.length !== 1 ? "Tags Applied" : "Tag Applied");
  };

  if (!Array.isArray(tags) || tags.length === 0) {
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <TagBadgeBase
            className={"metric-badge"}
            badgeText={`No ${tagLocation ? `${tagLocation} ` : ""}Tags Applied`}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <AppliedTagOverlay
      className={className}
      tags={tags}
    >
      <SpyglassBadge
        className={"metric-badge"}
        badgeText={getTagLabel()}
      />
    </AppliedTagOverlay>
  );
}

AppliedTagBadge.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
  tagLocation: PropTypes.string,
};

export default AppliedTagBadge;