import React from "react";
import PropTypes from "prop-types";
import OrganizationBadgeBase from "components/common/badges/tag/OrganizationBadgeBase";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import { hasStringValue } from "components/common/helpers/string-helpers";
import AppliedTagOverlay from "components/common/fields/multiple_items/tags/AppliedTagOverlay";
import AppliedOrganizationsOverlay from "components/common/fields/multiple_items/tags/AppliedOrganizationsOverlay";

function AppliedOrganizationsBadge({ tags, tagLocation, className, showNoTagsAppliedBadge }) {
  const getTagLabel = () => {
    let tagText = `${tags?.length} `;

    if (hasStringValue(tagLocation) === true) {
      tagText += `${tagLocation} `;
    }

    return tagText + (tags?.length !== 1 ? "Organizations Applied" : "Organization Applied");
  };

  if (!Array.isArray(tags) || tags.length === 0) {
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <OrganizationBadgeBase
            className={"metric-badge"}
            badgeText={`No ${tagLocation ? `${tagLocation} ` : ""}Organizations Applied`}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <AppliedOrganizationsOverlay className={className} tags={tags}>
      <SpyglassBadge className={"metric-badge"} badgeText={getTagLabel()} />
    </AppliedOrganizationsOverlay>
  );
}

AppliedOrganizationsBadge.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
  tagLocation: PropTypes.string,
};

export default AppliedOrganizationsBadge;
