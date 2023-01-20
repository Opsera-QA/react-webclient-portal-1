import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import TooltipWrapper from "../../../../../common/tooltip/TooltipWrapper";
import MetricScoreText from "../../../../../common/metrics/score/MetricScoreText";

function JiraChangeFailureRateTrendDataBlock({
  value,
  prevValue,
  trend,
  getTrendIcon,
  topText,
  bottomText,
  dataPoint,
  dataPointValue
}) {
    const score = dataPointValue ? dataPointValue : value;
    return (
        <DataBlockBoxContainer
            showBorder={true}
            className="h-100"
        >
            <ThreeLineDataBlockBase
                className={`${trend} p-2 h-100`}
                topText={topText}
                icon={getTrendIcon(trend)}
                bottomText={`${bottomText}${prevValue}`}
                middleText={
                    <MetricScoreText
                        score={score}
                        dataPoint={dataPoint}
                    />
                }
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

JiraChangeFailureRateTrendDataBlock.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prevValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trend: PropTypes.string,
    getTrendIcon: PropTypes.func,
    topText: PropTypes.string,
    bottomText: PropTypes.string,
    dataPoint: PropTypes.any,
    dataPointValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default JiraChangeFailureRateTrendDataBlock;
