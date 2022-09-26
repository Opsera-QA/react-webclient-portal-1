import { useState } from "react";
import useGetKpiDataPointModel
  from "components/admin/kpi_identifiers/details/data_points/hooks/useGetKpiDataPointModel";

export default function useGetNewKpiDataPointModel(kpiId) {
  const { getNewKpiDataPointModel } = useGetKpiDataPointModel();
  const [kpiDataPointModel, setKpiDataPointModel] = useState(getNewKpiDataPointModel(undefined, kpiId, true));

  return ({
    kpiDataPointModel: kpiDataPointModel,
    setKpiDataPointModel: setKpiDataPointModel,
  });
}
