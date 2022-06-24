import React from "react";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import PropTypes from 'prop-types';
import FilterContainer from "components/common/table/FilterContainer";
import LookupTableTotals from "./LookupTableTotals";
import LookupTablePipelines from "./LookupTablePipelines";

const LookupResults = ({ totals, pipelines, componentName }) => {
    console.log({ totals, pipelines, componentName });
    return (
        <>
            <FilterContainer
                className="mt-2 lookup-table"
                showBorder={false}
                body={<LookupTableTotals data={totals} />}
                titleIcon={faBug}
                title={`${componentName}: Totals`}
            />
            <FilterContainer
                className="mt-2 lookup-table lookup-pipelines"
                showBorder={false}
                body={<LookupTablePipelines data={pipelines} />}
                titleIcon={faBug}
                title={`${componentName}: Pipelines`}
            />
        </>
    );
};

LookupResults.propTypes = {
    totals: PropTypes.array,
    pipelines: PropTypes.array,
    componentName: PropTypes.string
};

export default LookupResults;