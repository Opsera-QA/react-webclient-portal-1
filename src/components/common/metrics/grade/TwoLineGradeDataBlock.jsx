import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricLetterGradeText from "components/common/metrics/grade/MetricLetterGradeText";

function TwoLineGradeDataBlock(
  {
    letterGrade,
    subtitle,
    className,
    dataBlockInfoPanel
  }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      title={<MetricLetterGradeText letterGrade={letterGrade} />}
      subtitle={subtitle}
      infoOverlayPanel={dataBlockInfoPanel}
    />
  );
}

TwoLineGradeDataBlock.propTypes = {
  letterGrade: PropTypes.string,
  subtitle: PropTypes.any,
  tooltipText: PropTypes.string,
  className: PropTypes.string,
  dataBlockInfoPanel: PropTypes.any,
};

export default TwoLineGradeDataBlock;