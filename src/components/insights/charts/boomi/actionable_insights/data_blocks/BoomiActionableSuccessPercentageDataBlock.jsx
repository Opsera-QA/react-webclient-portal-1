import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "../../../../../common/metrics/percentage/TwoLinePercentageDataBlock";

function BoomiActionableFreqDataBlock({ data, icon, className }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <TwoLinePercentageDataBlock
                className={className}
                percentage={data}
                subtitle={"Success Percentage"}
            />
        </DataBlockBoxContainer>
    );
}

BoomiActionableFreqDataBlock.propTypes = {
    data: PropTypes.number,
    icon: PropTypes.object,
    className: PropTypes.string,
};

export default BoomiActionableFreqDataBlock;