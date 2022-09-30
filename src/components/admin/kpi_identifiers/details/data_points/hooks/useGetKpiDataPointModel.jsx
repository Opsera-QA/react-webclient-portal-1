import useComponentStateReference from "hooks/useComponentStateReference";
import KpiDataPointModel from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.model";

export default function useGetKpiDataPointModel() {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const getNewKpiDataPointModel = (dataPoint, kpiId, isNew) => {
    const newModel = new KpiDataPointModel(
      dataPoint,
      isNew,
      kpiId,
    );
    newModel.getAccessToken = getAccessToken;
    newModel.cancelTokenSource = cancelTokenSource;
    newModel.userData = userData;

    return newModel;
  };

  return ({
    getNewKpiDataPointModel: getNewKpiDataPointModel,
  });
}
