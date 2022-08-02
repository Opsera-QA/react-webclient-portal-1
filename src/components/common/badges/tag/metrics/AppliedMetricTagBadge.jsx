import React from "react";
import PropTypes from "prop-types";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import { faTags } from "@fortawesome/pro-light-svg-icons";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";
import AppliedMetricTagBadgeOverlay from "components/common/fields/multiple_items/tags/AppliedMetricTagOverlay";

function AppliedMetricTagBadge(
  {
    className,
    kpiTags,
    dashboardTags,
  }) {
  // TODO: Investigate using this line instead of inlining the tagCountFunction
  // const tagCount = getTagCount();

  const getTagCount = () => {
    let tagsCount = 0;

    if (Array.isArray(kpiTags)) {
      tagsCount += kpiTags.length;
    }

    if (Array.isArray(dashboardTags)) {
      tagsCount += dashboardTags.length;
    }

    return tagsCount;
  };

  if (getTagCount() === 0) {
    return (
      <div className={className}>
        <MetricBadgeBase
          icon={faTags}
          badgeText={`No Tags Applied`}
        />
      </div>
    );
  }

  return (
    <AppliedMetricTagBadgeOverlay
      className={className}
      kpiTags={kpiTags}
      dashboardTags={dashboardTags}
    >
      <SpyglassBadge
        className={"metric-subheader-text"}
        badgeText={`${getTagCount()} Tags Applied`}
      />
    </AppliedMetricTagBadgeOverlay>
  );
}

AppliedMetricTagBadge.propTypes = {
  className: PropTypes.string,
  kpiTags: PropTypes.array,
  dashboardTags: PropTypes.array,
};

export default AppliedMetricTagBadge;