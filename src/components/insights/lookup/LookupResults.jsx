import React, { useState } from "react";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import PropTypes from 'prop-types';
import LoadingDialog from "components/common/status_notifications/loading";
import FilterContainer from "components/common/table/FilterContainer";
import LookupTableTotals from "./LookupTableTotals";
import LookupTablePipelines from "./LookupTablePipelines";
import TabTreeAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";

const LookupResults = ({ isLoading, results }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0); //default to 0th result

    const handleTabClick = eventKey => {
        setActiveTabIndex(results.findIndex(({ componentName }) => componentName === eventKey));
    };

    let totals, componentName, pipelines;

    let currentActiveTable = null;

    if (results) {
        currentActiveTable = results[activeTabIndex];
    }

    if (currentActiveTable) {
        totals = currentActiveTable.totals;
        componentName = currentActiveTable.componentName;
        pipelines = currentActiveTable.pipelines;
    }

    if (isLoading) {
        return (
          <LoadingDialog size={"sm"} message={"Loading Customer Onboard Editor"} />
        );
    }

    if (!results || results.length === 0) {
        return null;
    }

    const activeTabText = results[activeTabIndex].componentName;

    const getTabContainer = () => (
        <VanitySetVerticalTabContainer>
            {results && results.map(({ componentName }, index) => (
                <VanitySetVerticalTab
                    key={`${componentName}-${index}`}
                    tabText={componentName}
                    tabName={componentName}
                    handleTabClick={handleTabClick}
                    activeTab={activeTabText}
                />
            ))}
        </VanitySetVerticalTabContainer>
    );

    const getCurrentView = () => (
        <>
            <FilterContainer
                className="mt-2 lookup-table"
                showBorder={false}
                body={<LookupTableTotals data={totals} />}
                titleIcon={faBug}
                title={`${componentName}: Totals`}
            />
            <FilterContainer
                className="mt-2 lookup-pipelines"
                showBorder={false}
                body={<LookupTablePipelines data={pipelines} />}
                titleIcon={faBug}
                title={`${componentName}: Pipelines`}
            />
        </>
    );
    
    return (
        <TabTreeAndViewContainer
            verticalTabContainer={getTabContainer()}
            currentView={getCurrentView()}
            tabColumnSize={3}
            defaultActiveKey={0}
        />
    );
};

LookupResults.propTypes = {
    isLoading: PropTypes.bool,
    results: PropTypes.arrayOf(
        PropTypes.shape({
            totals: PropTypes.array,
            pipelines: PropTypes.array,
            componentName: PropTypes.string
        })
    )
};

export default LookupResults;