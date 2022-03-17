import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricScoreTextWithSupportingText from "components/common/metrics/score/MetricScoreTextWithSupportingText";

// TODO: Rework
function TwoLineScoreWithSupportingTextDataBlock(
  {
    score,
    supportingText,
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
      title={<MetricScoreTextWithSupportingText score={score} supportingText={supportingText} />}
      subtitle={subtitle}
      icon={icon}
      iconOverlayTitle={iconOverlayTitle}
      iconOverlayBody={iconOverlayBody}
      dataPoint={dataPoint}
    />
  );
}

TwoLineScoreWithSupportingTextDataBlock.propTypes = {
  score: PropTypes.number,
  supportingText: PropTypes.string,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  iconOverlayTitle: PropTypes.string,
  iconOverlayBody: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default TwoLineScoreWithSupportingTextDataBlock;