import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";

function GithubCommitFrequencyDataBlock({
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

GithubCommitFrequencyDataBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  prevValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topText: PropTypes.string,
  bottomText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GithubCommitFrequencyDataBlock.defaultProps = {
  prevValue: "",
  topText: "",
  bottomText: "",
};


export default GithubCommitFrequencyDataBlock;
