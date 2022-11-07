import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "../../../../../common/metrics/score/MetricScoreText";

function GitlabPipelineStatisticsDataBlock({
  value,
  prevValue,
  topText,
  bottomText,
}) {
  return (
    <DataBlockBoxContainer
      showBorder={true}
      className="h-100"
    >
      <ThreeLineDataBlockBase
        className={`p-2 h-100`}
        topText={topText}
        icon={null}
        bottomText={`${bottomText}${prevValue}`}
        middleText={
          <MetricScoreText
            score={value}
            dataPoint={null}
          />
        }
        dataPoint={null}
      />
    </DataBlockBoxContainer>
  );
}

GitlabPipelineStatisticsDataBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prevValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topText: PropTypes.string,
  bottomText: PropTypes.string,
};

export default GitlabPipelineStatisticsDataBlock;
