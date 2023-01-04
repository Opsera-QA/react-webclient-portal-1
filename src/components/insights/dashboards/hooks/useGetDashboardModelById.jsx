import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetDashboardModel from "components/insights/dashboards/hooks/useGetDashboardModel";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";

export default function useGetDashboardModelById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardModel, setDashboardModel] = useState(undefined);
  const { getNewDashboardModel } = useGetDashboardModel();
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setDashboardModel(undefined);

    if (isMongoDbId(id) === true) {
      loadData().catch(() => {
      });
    }
  }, [id]);

  const loadData = async (hardRefresh) => {
    try {
      setIsLoading(true);

      if (hardRefresh === true) {
        setDashboardModel(undefined);
      }

      await getDashboard();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboard = async () => {
    const response = await dashboardsActions.getDashboardByIdV2(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const dashboard = response?.data?.data;

    if (dashboard) {
      const newModel = getNewDashboardModel(dashboard, false, async () => loadData(true),);
      setDashboardModel({...newModel});
    }
  };

  return ({
    dashboardModel: dashboardModel,
    setDashboardModel: setDashboardModel,
    loadData: loadData,
    isLoading: isLoading,
  });
}
