import React, { useContext } from "react";
import PropTypes from "prop-types";
import { faShield } from "@fortawesome/pro-light-svg-icons";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import UnassignedRulesItemsVerticalTabContainer from "./UnassignedRulesItemsVerticalTabContainer";
import UnassignedRulesItemsTable from "./UnassignedRulesItemsTable";

function UnassignedRulesItemsView({
  items,
  itemFilterModel,
  setItemFilterModel,
  loadData,
  isLoading,
  isMounted,
}) {
  const toastContext = useContext(DialogToastContext);

  const getVerticalTabContainer = () => {
    return (
      <UnassignedRulesItemsVerticalTabContainer
        itemFilterModel={itemFilterModel}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  const getUnassignedRulesItemsTable = () => {
    return (
      <UnassignedRulesItemsTable
        items={items}
        loadData={loadData}
        isLoading={isLoading}
        itemFilterModel={itemFilterModel}
        setItemFilterModel={setItemFilterModel}
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
    />
  );
}

UnassignedRulesItemsView.propTypes = {
  items: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  itemFilterModel: PropTypes.object,
  setItemFilterModel: PropTypes.func,
  isMounted: PropTypes.object,
};

export default UnassignedRulesItemsView;
