import React from "react";
import {useParams} from "react-router-dom";
import DashboardScreenContainer from "components/common/panels/detail_view_container/DashboardScreenContainer";
import useGetDashboardModelById from "components/insights/dashboards/hooks/useGetDashboardModelById";

export default function DashboardDetailView() {
  const {tab, id} = useParams();
  const {
    dashboardModel,
    setDashboardModel,
    isLoading,
    loadData,
  } = useGetDashboardModelById(id);

  return (
    <DashboardScreenContainer
      dashboardModel={dashboardModel}
      setDashboardModel={setDashboardModel}
      isLoading={isLoading}
      tab={tab}
      loadData={loadData}
    />
  );
}