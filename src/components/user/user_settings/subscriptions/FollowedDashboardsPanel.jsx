import React from "react";
import PropTypes from "prop-types";
import DashboardsTable from "components/insights/dashboards/views/DashboardsTable";
import useGetDashboards from "hooks/insights/dashboards/useGetDashboards";

export default function FollowedDashboardsPanel({className}) {
  const {
    dashboards,
    loadData,
    isLoading,
    error,
  } = useGetDashboards(
    undefined,
    true,
  );
  return (
    <div className={className}>
      <DashboardsTable
        dashboards={dashboards}
        loadData={loadData}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

FollowedDashboardsPanel.propTypes = {
  className: PropTypes.string
};
