import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LookupMetricTotalsDataBlocks from "components/insights/lookup/LookupMetricTotalsDataBlocks";
import InsightsLookupPipelinesTable from "components/insights/lookup/InsightsLookupPipelinesTable";
import TabTreeAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";
import LookupMultiSelectInput from "components/insights/lookup/LookupMultiSelectInput";

function LookupResults({
                         isLoading,
                         loadData,
                         filterModel,
                         searchResults,
                         salesforceComponentNames,
                         selectedComponentName,
                         setSelectedComponentName,
                         noDataMessage,
                       }) {
  const handleTabClick = async (componentName) => {
    setSelectedComponentName(componentName);
    loadData(filterModel, componentName);
  };

  const getTabContainer = () => {
    if (
      !Array.isArray(salesforceComponentNames) ||
      salesforceComponentNames.length === 0
    ) {
      return null;
    }

    return (
      <VanitySetVerticalTabContainer>
        {salesforceComponentNames?.map((component, index) => {
          const componentName = component;
          return (
            <VanitySetVerticalTab
              key={`${componentName}-${index}`}
              tabText={componentName}
              tabName={componentName}
              handleTabClick={handleTabClick}
              activeTab={selectedComponentName}
            />
          );
        })}
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    const selectedComponent = searchResults?.find(
      (component) => component.componentName === selectedComponentName,
    );

    if (selectedComponent) {
      return (
        <div className={"m-2"}>
          <LookupMetricTotalsDataBlocks
            metrics={selectedComponent?.totals?.[0]}
            componentName={selectedComponentName}
          />
          <div className={"mt-2"} />
          <InsightsLookupPipelinesTable
            pipelines={selectedComponent?.pipelines}
            componentName={selectedComponentName}
          />
        </div>
      );
    }
  };

  const getBody = () => {
    return (
      <TabTreeAndViewContainer
        verticalTabContainer={getTabContainer()}
        currentView={getCurrentView()}
        tabColumnSize={3}
        defaultActiveKey={0}
      />
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading}
      data={salesforceComponentNames}
      noDataMessage={noDataMessage}
      tableComponent={getBody()}
    />
  );
}

LookupResults.propTypes = {
  isLoading: PropTypes.bool,
  filterModel: PropTypes.any,
  searchResults: PropTypes.array,
  salesforceComponentNames: PropTypes.array,
  loadData: PropTypes.func,
  selectedComponentName: PropTypes.any,
  setSelectedComponentName: PropTypes.func,
  noDataMessage: PropTypes.string,
};

export default LookupResults;
