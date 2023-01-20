import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import kpiDataPointActions from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useGetKpiDataPoints(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (isMongoDbId(id) === true) {
      loadData().catch(() => {});
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getKpiDataPoints();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getKpiDataPoints = async () => {
    const response = await kpiDataPointActions.getKpiDataPointsV2(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const dataPoints = DataParsingHelper.parseArray(response?.data?.data, []);

    if (dataPoints) {
      setDataPoints([...dataPoints]);
    }
  };

  return ({
    dataPoints: dataPoints,
    setDataPoints: setDataPoints,
    loadData: loadData,
    isLoading: isLoading,
  });
}
