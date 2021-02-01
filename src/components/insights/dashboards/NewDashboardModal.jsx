import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import CreateModal from "components/common/modal/CreateModal";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";

function NewDashboardModal({ setShowModal, loadData, showModal } ) {
  const [dashboardData, setDashboardData] = useState(undefined);

  useEffect(() => {
    setDashboardData(new Model({...dashboardMetadata.newObjectFields}, dashboardMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Dashboard"} showModal={showModal} loadData={loadData} >
      <DashboardEditorPanel setDashboardData={setDashboardData} handleClose={handleClose} dashboardData={dashboardData} />
    </CreateModal>
  );
}

NewDashboardModal.propTypes = {
  loadData: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default NewDashboardModal;


