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
  searchResults,
  salesforceComponentNames,
  noDataMessage,
}) {
  const [selectedComponentName, setSelectedComponentName] = useState(undefined);
  useEffect(() => {
    setSelectedComponentName(undefined);

    if (
      Array.isArray(salesforceComponentNames) &&
      salesforceComponentNames.length > 0
    ) {
      setSelectedComponentName(salesforceComponentNames[0]);
    }
  }, [salesforceComponentNames]);

  const handleTabClick = (componentName) => {
    setSelectedComponentName(componentName);
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
    const selectedComponent = salesforceComponentNames?.find(
      (component) => component === selectedComponentName,
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
  salesforceComponentNames: PropTypes.array,
  searchResults: PropTypes.array,
  noDataMessage: PropTypes.string,
};

export default LookupResults;
