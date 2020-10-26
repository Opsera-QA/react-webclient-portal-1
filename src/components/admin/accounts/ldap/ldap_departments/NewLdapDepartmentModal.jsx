import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import ldapDepartmentMetaData from "./ldap-department-metadata";
import LdapDepartmentEditorPanel from "./department_detail_view/LdapDepartmentEditorPanel";
import CreateModal from "../../../../common/modal/CreateModal";
import Model from "../../../../../core/data_model/model";

function NewLdapDepartmentModal({ setShowModal, showModal, loadData, authorizedActions, orgDomain } ) {
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);

  useEffect(() => {
    setLdapDepartmentData(new Model({...ldapDepartmentMetaData.newObjectFields}, ldapDepartmentMetaData, true));
  }, []);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
      <CreateModal handleCancelModal={handleClose} objectType={"Department"} showModal={showModal} loadData={loadData} >
        {ldapDepartmentData && <LdapDepartmentEditorPanel orgDomain={orgDomain} authorizedActions={authorizedActions} setLdapDepartmentData={setLdapDepartmentData} ldapDepartmentData={ldapDepartmentData} handleClose={handleClose} />}
      </CreateModal>
  );
}

NewLdapDepartmentModal.propTypes = {
  showModal: PropTypes.bool,
  orgDomain: PropTypes.string,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default NewLdapDepartmentModal;


