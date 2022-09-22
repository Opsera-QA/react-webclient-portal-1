import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "../../../../common/metrics/score/MetricScoreText";

function GitlabDeploymentFrequencyTrendDataBlock({
  value,
  prevValue,
  trend,
  dataPoint,
  getReverseIcon,
  topText,
  bottomText,
}) {
  return (
    <DataBlockBoxContainer
      showBorder={true}
      className="h-100"
    >
      <ThreeLineDataBlockBase
        className={`${trend} h-100`}
        topText={topText}
        icon={getReverseIcon(trend)}
        bottomText={`${bottomText}${prevValue}`}
        middleText={
          <MetricScoreText
            score={value}
            dataPoint={dataPoint}
          />
        }
        dataPoint={dataPoint}
      />
    </DataBlockBoxContainer>
  );
}

GitlabDeploymentFrequencyTrendDataBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prevValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  trend: PropTypes.string,
  dataPoint: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  getReverseIcon: PropTypes.func,
  topText: PropTypes.string,
  bottomText: PropTypes.string,
};

export default GitlabDeploymentFrequencyTrendDataBlock;
