import React, { useContext, } from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel.jsx";
import { DialogToastContext } from "contexts/DialogToastContext";
import KpiDataPointEditorPanel from "components/admin/kpi_identifiers/details/data_points/KpiDataPointEditorPanel";
import useGetNewKpiDataPointModel
  from "components/admin/kpi_identifiers/details/data_points/hooks/useGetNewKpiDataPointModel";

export default function NewKpiDataPointOverlay(
  {
    loadData,
    kpiId,
  }) {
  const toastContext = useContext(DialogToastContext);
  const {
    kpiDataPointModel,
  } = useGetNewKpiDataPointModel(kpiId);

  const closePanel = () => {
    if (loadData != null) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (kpiDataPointModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      objectType={kpiDataPointModel?.getType()}
      loadData={loadData}
      closePanel={closePanel}
    >
      <div className={"m-3"}>
        <KpiDataPointEditorPanel
          dataPointModel={kpiDataPointModel}
          closeEditorPanel={closePanel}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewKpiDataPointOverlay.propTypes = {
  loadData: PropTypes.func,
  kpiId: PropTypes.string,
};
