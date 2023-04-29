import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useComponentStateReference from "hooks/useComponentStateReference";
import useDashboardActions from "hooks/insights/dashboards/useDashboardActions";
import DashboardFilterModel from "components/insights/dashboards/views/dashboard.filter.model";
import DashboardRoleHelper from "@opsera/know-your-role/roles/analytics/dashboards/dashboardRole.helper";

export default function useGetDashboards(
  fields,
  setUrlParameters = false,
  pageSize,
  handleErrorFunction,
) {
  const [dashboards, setDashboards] = useState(undefined);
  const [dashboardFilterModel, setDashboardFilterModel] = useState(new DashboardFilterModel());
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const { userData, areAnalyticsToolsEnabled } = useComponentStateReference();
  const dashboardActions = useDashboardActions();

  useEffect(() => {
    setDashboards([]);

    if (pageSize) {
      DashboardFilterModel.setData("pageSize", pageSize);
    }

    if (loadData && areAnalyticsToolsEnabled === true) {
      loadData(getDashboards, handleErrorFunction).catch(() => {});
    }
  }, [areAnalyticsToolsEnabled]);

  const getDashboards = async (
    newFilterModel = dashboardFilterModel,
  ) => {
    setDashboards([]);

    if (DashboardRoleHelper.canGetDashboards(userData) !== true) {
      return;
    }

    const response = await dashboardActions.getDashboards(
      newFilterModel,
    );
    const newDashboards = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setDashboards([...newDashboards]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setDashboardFilterModel({...newFilterModel});
  };

  return ({
    dashboards: dashboards,
    setDashboards: setDashboards,
    dashboardFilterModel: dashboardFilterModel,
    setDashboardFilterModel: setDashboardFilterModel,
    loadData: async (newFilterModel) => loadData(async () => getDashboards(newFilterModel), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
