import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import KpiEditorPanel from "./kpi_detail_view/KpiEditorPanel";
import CreateModal from "../../common/modal/CreateModal";
import Model from "../../../core/data_model/model";
import kpiMetaData from "./kpi_detail_view/kpi-form-fields";

function NewKpiModal( { setShowModal, showModal, loadData } ) {
  const [kpiData, setKpiData] = useState(undefined);

  useEffect(() => {
    setKpiData(new Model({...kpiMetaData.newObjectFields}, kpiMetaData, true));
  }, []);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Organization"} showModal={showModal} loadData={loadData} >
        {kpiData && <KpiEditorPanel setKpiData={setKpiData} kpiData={kpiData} handleClose={handleClose} />}
      </CreateModal>
    </>
  );
}

NewKpiModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewKpiModal;


