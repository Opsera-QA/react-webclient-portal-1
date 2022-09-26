import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import taskActions from "components/tasks/task.actions";
import kpiDataPointActions from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.actions";

export default function useGetKpiDataPointById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataPoint, setDataPoint] = useState(false);
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (isMongoDbId(id) === true) {
      loadData().catch(() => {
      });
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getKpiDataPointById();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getKpiDataPointById = async () => {
    const response = await kpiDataPointActions.g(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const task = response?.data?.data;

    if (task) {
      setDataPoint({...newModel});
    }
  };

  return ({
    dataPoint: dataPoint,
    setTaskModel: setTaskModel,
    loadData: loadData,
    isLoading: isLoading,
  });
}
