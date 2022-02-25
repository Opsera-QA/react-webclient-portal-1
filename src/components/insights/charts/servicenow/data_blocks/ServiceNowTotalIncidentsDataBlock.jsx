import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function ServiceNowTotalIncidentsDataBlock({ data }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
                className={"p-3"}
                score={data}
                subtitle={"Total Incidents"}
            />
        </DataBlockBoxContainer>
    );
}

ServiceNowTotalIncidentsDataBlock.propTypes = {
    data: PropTypes.number,
};

export default ServiceNowTotalIncidentsDataBlock;
