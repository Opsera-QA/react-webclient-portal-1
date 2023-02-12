import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "../../../../common/metrics/score/MetricScoreText";

function JiraMTTRDataBlock({ value, previousValue, trend, dataPoint, getIcon, topText, bottomText, onClick }) {
    return (
        <DataBlockBoxContainer className={"h-100"} showBorder={true} onClickFunction={onClick}>
            <ThreeLineDataBlockBase
                className={`${trend} p-2 h-100`}
                topText={topText}
                icon={getIcon(trend)}
                bottomText={`${bottomText}: ${previousValue}`}
                middleText={
                    <MetricScoreText
                        score={value}
                        dataPoint={dataPoint}
                        className={"metric-block-content-text"}
                    />}
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

JiraMTTRDataBlock.propTypes = {
    value: PropTypes.number,
    previousValue: PropTypes.number,
    trend: PropTypes.string,
    dataPoint: PropTypes.number,
    getIcon: PropTypes.func,
    topText: PropTypes.string,
    bottomText: PropTypes.string,
    onClick: PropTypes.func,
    classes: PropTypes.string,
    style: PropTypes.object
};

JiraMTTRDataBlock.defaultProps = {
    getIcon: () => {},
    classes: "",
    style: {}
};

export default JiraMTTRDataBlock;
