import React from "react";
import PropTypes from "prop-types";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import {hasStringValue} from "components/common/helpers/string-helpers";
import AppliedTagOverlay from "components/common/fields/multiple_items/tags/AppliedTagOverlay";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";

function MetricTagBadge({tags, type, className, showNoTagsAppliedBadge}) {
  const getTagLabel = () => {
    let tagText = `${tags?.length} `;

    if (hasStringValue(type) === true) {
      tagText += `${type} `;
    }

    return tagText + (tags?.length !== 1 ? "Tags Applied" : "Tag Applied");
  };

  if (!Array.isArray(tags) || tags.length === 0) {
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <MetricBadgeBase
            icon={faTags}
            badgeText={`No ${type ? `${type} ` : ""}Tags Applied`}
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
        className={"metric-subheader-text"}
        badgeText={getTagLabel()}
      />
    </AppliedTagOverlay>
  );
}

MetricTagBadge.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
  type: PropTypes.string,
};

export default MetricTagBadge;