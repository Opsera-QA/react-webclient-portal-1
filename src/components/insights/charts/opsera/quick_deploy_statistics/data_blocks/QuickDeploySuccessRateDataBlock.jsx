import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLinePercentageBlockBase from "../../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";

function QuickDeploySuccessRateDataBlock({ score, icon, className, onSelect, lastScore, iconOverlayBody}) {
    return (
        <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
            <ThreeLinePercentageBlockBase
                className={`${className} p-2`}
                percentage={score}
                topText={"Average Success Rate"}
                bottomText={"Last Scan: " + lastScore}
                icon={icon}
                iconOverlayBody = {iconOverlayBody}

            />
        </DataBlockBoxContainer>
    );
}

QuickDeploySuccessRateDataBlock.propTypes = {
    score: PropTypes.number,
    icon: PropTypes.object,
    className: PropTypes.string,
    onSelect: PropTypes.func,
    lastScore: PropTypes.number,
    iconOverlayBody: PropTypes.any,
};

export default QuickDeploySuccessRateDataBlock;