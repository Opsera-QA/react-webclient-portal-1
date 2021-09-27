import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

function NewDashboardModal({loadData, isMounted } ) {
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(new Model({...dashboardMetadata.newObjectFields}, dashboardMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={dashboardMetadata.type} loadData={loadData}>
      <DashboardEditorPanel setDashboardData={setDashboardData} handleClose={closePanel} dashboardData={dashboardData} />
    </CreateCenterPanel>
  );
}

NewDashboardModal.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object
};

export default NewDashboardModal;


