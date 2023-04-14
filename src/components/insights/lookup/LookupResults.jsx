import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LookupMetricTotalsDataBlocks from "components/insights/lookup/LookupMetricTotalsDataBlocks";
import InsightsLookupPipelinesTable from "components/insights/lookup/InsightsLookupPipelinesTable";
import TabTreeAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

function LookupResults({
                         isLoading,
                         loadData,
                         filterModel,
                           setFilterModel,
                         searchResults,
                         salesforceComponentNames,
                         selectedComponentName,
                         setSelectedComponentName,
                         noDataMessage,
                       }) {
   let firstElement = salesforceComponentNames?.[0];
  const handleTabClick = async (componentName) => {
      let newFilterDto = filterModel;
      if(componentName){
        setSelectedComponentName(componentName);
        loadData(filterModel, componentName);}
      else {
          setSelectedComponentName(firstElement);
          loadData(filterModel, firstElement);
      }

      newFilterDto.setDefaultValue("search");
  };

  const getTabContainer = () => {
    if (
      !Array.isArray(salesforceComponentNames) ||
      salesforceComponentNames.length === 0
    ) {
      return "NO Data available";
    }

    return (
      <VanitySetVerticalTabContainer
          supportSearch={true}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
      >
        {salesforceComponentNames?.map((component, index) => {
          const componentName = component;
          return (
            <VanitySetVerticalTab
              key={`${componentName}-${index}`}
              tabText={componentName}
              tabName={componentName}
              handleTabClick={handleTabClick}
              activeTab={selectedComponentName ? selectedComponentName : firstElement}
            />
          );
        })}
      </VanitySetVerticalTabContainer>
    );
  };


  const getCurrentView = () => {

      console.log("first element", firstElement);
      console.log("search results", searchResults);

      let selectedComponent = "";
      if(selectedComponentName) {
          console.log("in chosen");
          selectedComponent = searchResults?.find(
              (component) => component.componentName === selectedComponentName,
          );
      }
      // } else {
      //     console.log("in default");
      //     selectedComponent = searchResults?.find(
      //         (component) => component.componentName === firstElement,
      //     );
      // }
      console.log("selected", selectedComponent);

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
            startDate = {filterModel?.getData("startDate")}
            endDate = {filterModel?.getData("endDate")}
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
    setFilterModel: PropTypes.any,
  searchResults: PropTypes.array,
  salesforceComponentNames: PropTypes.array,
  loadData: PropTypes.func,
  selectedComponentName: PropTypes.any,
  setSelectedComponentName: PropTypes.func,
  noDataMessage: PropTypes.string,
};

export default LookupResults;
