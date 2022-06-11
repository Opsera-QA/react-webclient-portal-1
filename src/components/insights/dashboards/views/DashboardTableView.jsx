import React, {useContext} from "react";
import PropTypes from "prop-types";
import { faChartNetwork } from "@fortawesome/pro-light-svg-icons";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import FavoritesFilter from "components/common/filters/dashboards/favorites/FavoritesFilter";
import InlineDashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/InlineDashboardTypeFilter";
import DashboardsTable from "components/insights/dashboards/views/DashboardsTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewDashboardModal from "components/insights/dashboards/NewDashboardModal";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import DashboardVerticalTabContainer from "components/insights/dashboards/views/DashboardVerticalTabContainer";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";

function DashboardTableView(
  {
    dashboards,
    dashboardFilterModel,
    setDashboardFilterModel,
    loadData,
    isLoading,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);

  const getVerticalTabContainer = () => {
    return (
      <DashboardVerticalTabContainer
        dashboardFilterModel={dashboardFilterModel}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  const getDynamicFilter = () => {
    if (dashboardFilterModel?.getData("type") !== "owner") {
      return (
        <OwnerFilter
          filterModel={dashboardFilterModel}
          setFilterModel={setDashboardFilterModel}
          className={"mt-2"}
        />
      );
    }
  };

  const getDropdownFilters = () => {
    return (
      <>
        {getDynamicFilter()}
        <ActiveFilter
          filterDto={dashboardFilterModel}
          setFilterDto={setDashboardFilterModel}
          className={"mb-2"}
        />
        <FavoritesFilter
          filterModel={dashboardFilterModel}
          setFilterModel={setDashboardFilterModel}
        />
      </>
    );
  };

  const createNewDashboard = () => {
    toastContext.showOverlayPanel(
      <NewDashboardModal
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineDashboardTypeFilter
        filterModel={dashboardFilterModel}
        setFilterModel={setDashboardFilterModel}
        loadData={loadData}
        className={"mr-2"}
      />
    );
  };

  const getDashboardsTable = () => {
    return (
      <DashboardsTable
        dashboards={dashboards}
        loadData={loadData}
        isLoading={isLoading}
        dashboardFilterModel={dashboardFilterModel}
        setDashboardFilterModel={setDashboardFilterModel}
      />
    );
  };

  const getBody = () => {
    return (
      <TabAndViewContainer
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getDashboardsTable()}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createNewDashboard}
      isLoading={isLoading}
      body={getBody()}
      titleIcon={faChartNetwork}
      metadata={dashboardMetadata}
      supportSearch={true}
      title={"Dashboards"}
      filterDto={dashboardFilterModel}
      setFilterDto={setDashboardFilterModel}
      dropdownFilters={getDropdownFilters()}
      inlineFilters={getInlineFilters()}
      className={"px-2 pb-2"}
    />
  );
}

DashboardTableView.propTypes = {
  dashboards: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  dashboardFilterModel: PropTypes.object,
  setDashboardFilterModel: PropTypes.func,
  isMounted: PropTypes.object,
};

export default DashboardTableView;