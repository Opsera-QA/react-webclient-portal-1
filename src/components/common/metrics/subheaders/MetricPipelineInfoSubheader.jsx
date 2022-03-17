import React  from "react";
import PropTypes from "prop-types";
import {truncateString} from "components/common/helpers/string-helpers";
import {faClock, faDraftingCompass, faTally} from "@fortawesome/pro-light-svg-icons";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";

function MetricPipelineInfoSubheader(
  {
    className,
    pipelineName,
    pipelineRunCount,
    pipelineDuration,
  }) {
  const getPipelineBadge = () => {
    const parsedPipelineName = truncateString(pipelineName, 47);

    return (
      <MetricBadgeBase
        className={"mr-3"}
        icon={faDraftingCompass}
        badgeText={parsedPipelineName}
      />
    );
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        {getPipelineBadge()}
        <MetricBadgeBase
          className={"mr-3"}
          icon={faTally}
          badgeText={`Run Count: ${pipelineRunCount}`}
        />
        <MetricBadgeBase
          className={"mr-3"}
          icon={faClock}
          badgeText={`Duration: ${pipelineDuration}`}
        />
      </div>
    </div>
  );
}

MetricPipelineInfoSubheader.propTypes = {
  className: PropTypes.string,
  pipelineName: PropTypes.string,
  pipelineRunCount: PropTypes.number,
  pipelineDuration: PropTypes.any,
};

export default React.memo(MetricPipelineInfoSubheader);