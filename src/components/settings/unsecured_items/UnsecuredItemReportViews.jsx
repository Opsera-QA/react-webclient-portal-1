import React from "react";
import PropTypes from "prop-types";
import { faShield } from "@fortawesome/pro-light-svg-icons";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import UnsecuredItemReportVerticalTabContainer from "components/settings/unsecured_items/UnsecuredItemReportVerticalTabContainer";
import UnsecuredItemReportTable from "components/settings/unsecured_items/UnsecuredItemReportTable";
import { FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION } from "components/common/table/FilterContainer.jsx";

function UnsecuredItemReportViews({
  items,
  itemFilterModel,
  setItemFilterModel,
  loadData,
  isLoading,
}) {
  const getVerticalTabContainer = () => {
    return (
      <UnsecuredItemReportVerticalTabContainer
        itemFilterModel={itemFilterModel}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  const getUnassignedRulesItemsTable = () => {
    return (
      <UnsecuredItemReportTable
        items={items}
        loadData={loadData}
        isLoading={isLoading}
        itemFilterModel={itemFilterModel}
        setItemFilterModel={setItemFilterModel}
        tableHeight={
          FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
        }
      />
    );
  };

  const getBody = () => {
    return (
      <TabAndViewContainer
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getUnassignedRulesItemsTable()}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getBody()}
      titleIcon={faShield}
      metadata={dashboardMetadata}
      title={"Unassigned Rules"}
      filterDto={itemFilterModel}
      setFilterDto={setItemFilterModel}
      className={"px-2 pb-2"}
      minimumHeight={
        FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
      }
    />
  );
}

UnsecuredItemReportViews.propTypes = {
  items: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  itemFilterModel: PropTypes.object,
  setItemFilterModel: PropTypes.func,
  isMounted: PropTypes.object,
};

export default UnsecuredItemReportViews;
