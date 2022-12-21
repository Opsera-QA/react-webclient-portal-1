import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import ThreeLineDataBlockBase from "../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import {getQualityBasedClassName} from "../../charts-helpers";


function GitlabMergeRequestTrendDataBlock({
                                                    value,
                                                    prevValue,
                                                    trend,
                                                    dataPoint,
                                                    dataPointValue,
                                                    getTrendIcon,
                                                    topText,
                                                    bottomText,
                                                    onClick
                                                }) {
    let qualityLevel;
    if(dataPoint && dataPointValue) {
        qualityLevel = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, dataPointValue);
    }
    return (
        <DataBlockBoxContainer
            onClickFunction={onClick}
            showBorder={true}
            className="h-100"
        >
            <ThreeLineDataBlockBase
                className={`${trend} p-2 h-100`}
                topText={topText}
                icon={getTrendIcon(trend)}
                bottomText={`${bottomText}${prevValue}`}
                middleText={
                    <span className={`${getQualityBasedClassName(qualityLevel)} metric-block-header-text`}>{`${value}`}</span>
                }
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

GitlabMergeRequestTrendDataBlock.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prevValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trend: PropTypes.string,
    dataPoint: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    dataPointValue:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    getTrendIcon: PropTypes.func,
    topText: PropTypes.string,
    bottomText: PropTypes.string,
    onClick: PropTypes.func
};

export default GitlabMergeRequestTrendDataBlock;
