import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricLetterGradeText from "components/common/metrics/grade/MetricLetterGradeText";

function TwoLineGradeDataBlock(
  {
    letterGrade,
    subtitle,
    className,
    icon,
    iconOverlayTitle,
    iconOverlayBody,
    dataPoint,
  }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      title={<MetricLetterGradeText letterGrade={letterGrade} />}
      subtitle={subtitle}
      icon={icon}
      iconOverlayTitle={iconOverlayTitle}
      iconOverlayBody={iconOverlayBody}
      dataPoint={dataPoint}
    />
  );
}

TwoLineGradeDataBlock.propTypes = {
  letterGrade: PropTypes.string,
  subtitle: PropTypes.any,
  tooltipText: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.object,
  iconOverlayTitle: PropTypes.string,
  iconOverlayBody: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default TwoLineGradeDataBlock;