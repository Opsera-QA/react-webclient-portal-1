import React  from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faClock, faDraftingCompass, faTally} from "@fortawesome/pro-light-svg-icons";
import BadgeBase from "components/common/badges/BadgeBase";

function MetricPipelineInfoSubheader(
  {
    className,
    pipelineName,
    pipelineRunCount,
    pipelineDuration,
  }) {
  const getClassNames = () => {
    let classNames = "d-flex chart-subheader-text";

    if (hasStringValue(className)) {
      classNames += ` ${className}`;
    }

    return classNames;
  };

  return (
    <div className={getClassNames()}>
      <BadgeBase
        className={"mr-3"}
        icon={faDraftingCompass}
        badgeText={`Pipeline: ${pipelineName}`}
      />
      <BadgeBase
        className={"mr-3"}
        icon={faTally}
        badgeText={`Run Count: ${pipelineRunCount}`}
      />
      <BadgeBase
        className={"mr-3"}
        icon={faClock}
        badgeText={`Duration: ${pipelineDuration}`}
      />
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