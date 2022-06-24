import React from "react";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import PropTypes from 'prop-types';
import LoadingDialog from "components/common/status_notifications/loading";
import FilterContainer from "components/common/table/FilterContainer";
import LookupTableTotals from "./LookupTableTotals";
import LookupTablePipelines from "./LookupTablePipelines";

const LookupResults = ({ isLoading, activeTables }) => {
    if (isLoading) {
        return (
          <LoadingDialog size={"sm"} message={"Loading Customer Onboard Editor"} />
        );
      }
    
      return (
        <>
            {activeTables && activeTables.map(({ totals, componentName, pipelines }, index) => (
                <div key={`${componentName}-${index}`}>
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
                </div>
            ))}
        </>
      );
};

LookupResults.propTypes = {
    isLoading: PropTypes.bool,
    activeTables: PropTypes.arrayOf(
        PropTypes.shape({
            totals: PropTypes.array,
            pipelines: PropTypes.array,
            componentName: PropTypes.string
        })
    )
};

export default LookupResults;