import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import kpiEditorMetadata from "components/admin/kpi_identifiers/kpiIdentifier.metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel.jsx";
import { DialogToastContext } from "contexts/DialogToastContext";
import KpiIdentifierEditorPanel from "components/admin/kpi_identifiers/details/KpiIdentifierEditorPanel";

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
      <KpiIdentifierEditorPanel setKpiData={setKpiData} kpiData={kpiData} handleClose={closePanel} />
    </CreateCenterPanel>
  );
}

NewKpiOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewKpiOverlay;
