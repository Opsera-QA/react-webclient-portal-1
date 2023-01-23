import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";

function BoomiActionableTotalDeploymentsDataBlock({ data, icon, className }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
                className={className}
                score={data}
                subtitle={"Total Deployments"}
            />
        </DataBlockBoxContainer>
    );
}

BoomiActionableTotalDeploymentsDataBlock.propTypes = {
    data: PropTypes.number,
    icon: PropTypes.object,
    className: PropTypes.string,
};

export default BoomiActionableTotalDeploymentsDataBlock;