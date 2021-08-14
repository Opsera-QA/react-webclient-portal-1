import React from "react";
import PropTypes from "prop-types";
import DataBlockBase from "components/common/metrics/data_blocks/DataBlockBase";
import MetricLetterGrade from "components/common/metrics/grade/MetricLetterGrade";

function GradeDataBlock({ letterGrade, subtitle, tooltipText, className}) {
  return (
    <DataBlockBase
      className={className}
      title={<MetricLetterGrade letterGrade={letterGrade} />}
      subtitle={subtitle}
      tooltipText={tooltipText}
    />
  );
}

GradeDataBlock.propTypes = {
  letterGrade: PropTypes.string,
  subtitle: PropTypes.any,
  tooltipText: PropTypes.string,
  clickAction: PropTypes.func,
  className: PropTypes.string
};

export default GradeDataBlock;