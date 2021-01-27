import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import kpiMetaData from "components/admin/kpi_editor/kpi-metadata";
import CreateModal from "components/common/modal/CreateModal";
import KpiEditorPanel from "components/admin/kpi_editor/kpi_detail_view/KpiEditorPanel";

function NewKpiModal( { setShowModal, showModal, loadData } ) {
  const [kpiData, setKpiData] = useState(undefined);

  useEffect(() => {
    setKpiData(new Model({...kpiMetaData.newObjectFields}, kpiMetaData, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Organization"} showModal={showModal} loadData={loadData} >
      <KpiEditorPanel setKpiData={setKpiData} kpiData={kpiData} handleClose={handleClose} />
    </CreateModal>
  );
}

NewKpiModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewKpiModal;


