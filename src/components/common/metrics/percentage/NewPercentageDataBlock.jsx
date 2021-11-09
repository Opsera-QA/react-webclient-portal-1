import React from "react";
import PropTypes from "prop-types";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import PercentageGoalBlockBase from "../data_blocks/base/PercentageGoalBlockBase";

function NewPercentageDataBlock({ percentage, subtitle, className, qualityLevel, goal}) {
  return (
    <PercentageGoalBlockBase
      className={className}
      title={<MetricPercentageText percentage={percentage} qualityLevel={qualityLevel} />}
      subtitle={subtitle}
      goal = {goal}
    />
  );
}

NewPercentageDataBlock.propTypes = {
  percentage: PropTypes.number,
  goal: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
};

export default NewPercentageDataBlock;