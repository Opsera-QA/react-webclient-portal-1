import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function ServiceNowTotalAcknowledgedIncidentsDataBlock({ data }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
                className={"p-3"}
                score={data}
                subtitle={"Total Acknowledged"}
            />
        </DataBlockBoxContainer>
    );
}

ServiceNowTotalAcknowledgedIncidentsDataBlock.propTypes = {
    data: PropTypes.number,
};

export default ServiceNowTotalAcknowledgedIncidentsDataBlock;
