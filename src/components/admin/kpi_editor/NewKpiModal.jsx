import React, {useState, useContext, useEffect} from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import KpiEditorPanel from "./kpi_detail_view/KpiEditorPanel";
import CreateModal from "../../common/modal/CreateModal";
import LdapOrganizationEditorPanel
  from "../accounts/ldap/organizations/organizations_detail_view/LdapOrganizationEditorPanel";
import Model from "../../../core/data_model/model";
import {ldapOrganizationMetaData} from "../accounts/ldap/organizations/ldap-organizations-form-fields";
import kpiMetaData from "./kpi_detail_view/kpi-form-fields";

const INITIAL_DATA = {
  "name": "",
  "description": "",
  "tool_identifier": [],
  "type": "",
  "active": true,
  "persona": ["manager","developer", "executive"]
};



function NewKpiModal( { setShowModal, showModal, loadData } ) {
  const [kpiData, setKpiData] = useState(INITIAL_DATA);

  useEffect(() => {
    setKpiData(new Model({...kpiMetaData.newObjectFields}, kpiMetaData, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Organization"} showModal={showModal} loadData={loadData} >
        {kpiData && <KpiEditorPanel setKpiData={setKpiData} kpiData={kpiData} />}
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


