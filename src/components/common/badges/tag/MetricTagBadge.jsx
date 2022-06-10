import React from "react";
import PropTypes from "prop-types";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import {hasStringValue} from "components/common/helpers/string-helpers";
import AppliedTagOverlay from "components/common/fields/multiple_items/tags/AppliedTagOverlay";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";

function MetricTagBadge({tags, type, className, showNoTagsAppliedBadge, kpiTags, dashboardTags}) {

  if ((!Array.isArray(kpiTags) || kpiTags.length === 0) &&
      (!Array.isArray(dashboardTags) || dashboardTags.length === 0)
    ) {
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <MetricBadgeBase
            icon={faTags}
            badgeText={`No Tags Applied`}
          />
        </div>
      );
    }

    return null;
  }

  let tagsCount = 0;
  if(kpiTags && kpiTags.length>0)
  {
    tagsCount = kpiTags.length ;
  }
  if(dashboardTags && dashboardTags.length>0)
  {
    tagsCount = tagsCount + dashboardTags.length;
  }

  return (<AppliedTagOverlay
    className={className}
    kpiTags={kpiTags}
    dashboardTags={dashboardTags}
  >
    <SpyglassBadge
      className={"metric-subheader-text"}
      badgeText={`${tagsCount} Tags Applied`}
    />
  </AppliedTagOverlay>);

}

MetricTagBadge.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
  type: PropTypes.string,
  kpiTags: PropTypes.array,
  dashboardTags: PropTypes.array,
};

export default MetricTagBadge;