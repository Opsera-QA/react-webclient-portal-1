import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LookupMetricTotalsDataBlocks from "components/insights/lookup/LookupMetricTotalsDataBlocks";
import InsightsLookupPipelinesTable from "components/insights/lookup/InsightsLookupPipelinesTable";
import TabTreeAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

function LookupResults({ isLoading, searchResults, noDataMessage }) {
  const [selectedComponentName, setSelectedComponentName] = useState(undefined);

  useEffect(() => {
    setSelectedComponentName(undefined);

    if (Array.isArray(searchResults) && searchResults.length > 0) {
      setSelectedComponentName(searchResults[0]?.componentName);
    }
  }, [searchResults]);

  const handleTabClick = (componentName) => {
    setSelectedComponentName(componentName);
  };

  const getTabContainer = () => {
    if (!Array.isArray(searchResults) || searchResults.length === 0) {
      return null;
    }

    return (
    <VanitySetVerticalTabContainer>
      {searchResults?.map((component, index) => {
        const componentName = component?.componentName;

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
    const selectedComponent = searchResults?.find((component) => component?.componentName === selectedComponentName);

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
      data={searchResults}
      noDataMessage={noDataMessage}
      tableComponent={getBody()}
    />
  );
}

LookupResults.propTypes = {
  isLoading: PropTypes.bool,
  searchResults: PropTypes.array,
  noDataMessage: PropTypes.string,
};

export default LookupResults;