import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import kpiEditorMetadata from "components/admin/kpi_editor/kpiConfiguration.metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel.jsx";
import { DialogToastContext } from "contexts/DialogToastContext";
import KpiEditorPanel from "components/admin/kpi_editor/kpi_detail_view/KpiEditorPanel";

function NewKpiOverlay({ loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [kpiData, setKpiData] = useState(new Model({ ...kpiEditorMetadata.newObjectFields }, kpiEditorMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={kpiEditorMetadata.type} loadData={loadData}>
      <KpiEditorPanel setKpiData={setKpiData} kpiData={kpiData} handleClose={closePanel} />
    </CreateCenterPanel>
  );
}

NewKpiOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewKpiOverlay;
