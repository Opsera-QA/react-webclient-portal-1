import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricLetterGradeText from "components/common/metrics/grade/MetricLetterGradeText";

function TwoLineGradeDataBlock(
  {
    letterGrade,
    subtitle,
    className,
  }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      title={<MetricLetterGradeText letterGrade={letterGrade} />}
      subtitle={subtitle}
    />
  );
}

TwoLineGradeDataBlock.propTypes = {
  letterGrade: PropTypes.string,
  subtitle: PropTypes.any,
  tooltipText: PropTypes.string,
  className: PropTypes.string,
};

export default TwoLineGradeDataBlock;