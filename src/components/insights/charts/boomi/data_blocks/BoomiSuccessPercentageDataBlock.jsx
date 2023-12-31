import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLinePercentageBlockBase from "../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";

function BoomiSuccessPercentageDataBlock({ data, dataPoint, lastScore, icon, className }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <ThreeLinePercentageBlockBase
                className={`${className} p-2 h-70`}
                icon={icon}
                percentage={data}
                bottomText={`Previous: ${lastScore || lastScore === 0? lastScore : "NA"}`}
                topText={"Successful Execution Rate"}
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

BoomiSuccessPercentageDataBlock.propTypes = {
    data: PropTypes.number,
    lastScore: PropTypes.number,
    dataPoint: PropTypes.object,
    icon: PropTypes.object,
    className: PropTypes.string,
};

export default BoomiSuccessPercentageDataBlock;