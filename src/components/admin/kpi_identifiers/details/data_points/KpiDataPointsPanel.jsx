import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import KpiDataPointsTable from "components/admin/kpi_identifiers/details/data_points/KpiDataPointsTable";
import KpiDataPointEditorPanel from "components/admin/kpi_identifiers/details/data_points/KpiDataPointEditorPanel";
import useGetKpiDataPoints from "components/admin/kpi_identifiers/details/data_points/hooks/useGetKpiDataPoints";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function KpiDataPointsPanel({kpiId}) {
  const [dataPointModel, setDataPointModel] = useState(undefined);
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    dataPoints,
    loadData,
  } = useGetKpiDataPoints(kpiId);

  useEffect(() => {}, [kpiId]);

  const closeEditorPanel = async () => {
    setDataPointModel(null);
    await loadData();
  };

  if (dataPointModel != null) {
    return (
      <KpiDataPointEditorPanel
        dataPointModel={dataPointModel}
        closeEditorPanel={closeEditorPanel}
      />
    );
  }

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <KpiDataPointsTable
      loadData={loadData}
      isLoading={isLoading}
      dataPoints={dataPoints}
      setDataPointModel={setDataPointModel}
      kpiId={kpiId}
    />
  );
}

KpiDataPointsPanel.propTypes = {
  kpiId: PropTypes.string,
};
