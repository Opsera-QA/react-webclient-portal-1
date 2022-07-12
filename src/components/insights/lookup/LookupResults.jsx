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

const generateTransformedResults = searchResults => {
    const results = [];

    if (!searchResults) {
        return results;
    }

    const cleanedResults = {};
    const pipelineNames = Object.keys(searchResults);

    for (let i = 0, l = pipelineNames.length; i < l; i++){ 
      const pipelineName = pipelineNames[i];
      if (pipelineName !== 'dateRanges') {
        const pipelineData = searchResults[pipelineName].currentResults;
        cleanedResults[pipelineName] = {
          totalTimesComponentDeployed: pipelineData.totalTimesComponentDeployed,
          totalUnitTestsFailed: pipelineData.totalUnitTestsFailed,
          totalUnitTestsPassed: pipelineData.totalUnitTestsPassed,
          totalValidationsFailed: pipelineData.totalValidationsFailed,
          totalValidationsPassed: pipelineData.totalValidationsPassed,
          pipelineData: pipelineData.pipelineData
        };
      }
    }
    
    Object.entries(cleanedResults).forEach(([ name, data ]) => {
        const pipelineNames = Object.keys(data.pipelineData);
        const totals = [{
          deploy_count: data.totalTimesComponentDeployed,
          validations_passed: data.totalValidationsPassed,
          validations_failed: data.totalValidationsFailed,
          unit_tests_passed: data.totalUnitTestsPassed,
          unit_tests_failed: data.totalUnitTestsFailed,
          pipelines: pipelineNames.length
        }];
  
        const pipelines = [];
        for (let j = 0, k = pipelineNames.length; j < k; j++) {
          const pipelineName = pipelineNames[j];
          const pipeline = data.pipelineData[pipelineName];
          pipelines.push({
            pipeline: pipelineName,
            deploy_count: pipeline.totalTimesComponentDeployed,
            validations_passed: pipeline.totalValidationsPassed,
            validations_failed: pipeline.totalValidationsFailed,
            unit_tests_passed: pipeline.totalUnitTestsPassed,
            unit_tests_failed: pipeline.totalUnitTestsFailed,
            last_deploy: pipeline.customerName
          });
        }
  
        results.push({
          componentName: name,
          totals,
          pipelines
        });
    });

    return results;
};

const LookupResults = ({ isLoading, searchResults }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0); //default to 0th result

    // convert search results from API
    const results = generateTransformedResults(searchResults);

    const handleTabClick = eventKey => {
        setActiveTabIndex(results.findIndex(({ componentName }) => componentName === eventKey));
    };

    if (isLoading) {
        return (
          <LoadingDialog size="sm" message="Loading" />
        );
    }

    if (!searchResults) {
        return null;
    }

    if (results.length < 1) {
        return (
            <h3 className="mt-2 text-center">No Results</h3>
        );
    }

    let totals, componentName, pipelines;
    
    const currentActiveTable = results[activeTabIndex];

    if (currentActiveTable) {
        totals = currentActiveTable.totals;
        componentName = currentActiveTable.componentName;
        pipelines = currentActiveTable.pipelines;
    }

    const activeTabText = currentActiveTable ? currentActiveTable.componentName : null;

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
            hideBorder
        />
    );
};

LookupResults.propTypes = {
    isLoading: PropTypes.bool,
    searchResults: PropTypes.object
};

export default LookupResults;