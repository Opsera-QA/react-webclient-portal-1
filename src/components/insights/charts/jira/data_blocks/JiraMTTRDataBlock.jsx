import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "../../../../common/metrics/score/MetricScoreText";

function JiraMTTRDataBlock({ incidents,prevIncidents,trend, dataPoint, getReverseIcon, topText, bottomText }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <ThreeLineDataBlockBase
                className={`${trend} p-2`}
                topText={topText}
                icon={getReverseIcon(trend)}
                bottomText={`${bottomText}: ${prevIncidents}`}
                middleText={
                    <MetricScoreText
                        score={incidents}
                        dataPoint={dataPoint}
                        className={"metric-block-content-text"}
                    />}
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

JiraMTTRDataBlock.propTypes = {
    incidents: PropTypes.number,
    prevIncidents: PropTypes.number,
    trend: PropTypes.string,
    dataPoint: PropTypes.number,
    getReverseIcon: PropTypes.func,
    topText: PropTypes.string,
    bottomText: PropTypes.string,

};

export default JiraMTTRDataBlock;
