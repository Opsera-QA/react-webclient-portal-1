import { useState } from "react";
import useGetDashboardModel from "components/insights/dashboards/hooks/useGetDashboardModel";

export default function useGetNewDashboardModel() {
  const { getNewDashboardModel } = useGetDashboardModel();
  const [dashboardModel, setDashboardModel] = useState(getNewDashboardModel(undefined, true));

  return ({
    dashboardModel: dashboardModel,
    setDashboardModel: setDashboardModel,
  });
}
