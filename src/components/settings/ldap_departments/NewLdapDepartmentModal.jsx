import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ldapDepartmentMetaData from "components/settings/ldap_departments/ldap-department-metadata";
import CreateModal from "components/common/modal/CreateModal";
import LdapDepartmentEditorPanel
  from "components/settings/ldap_departments/details/LdapDepartmentEditorPanel";

function NewLdapDepartmentModal({ setShowModal, showModal, loadData, authorizedActions, orgDomain } ) {
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);

  useEffect(() => {
    setLdapDepartmentData(new Model({...ldapDepartmentMetaData.newObjectFields}, ldapDepartmentMetaData, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Department"} showModal={showModal} loadData={loadData} >
      <LdapDepartmentEditorPanel orgDomain={orgDomain} authorizedActions={authorizedActions} setLdapDepartmentData={setLdapDepartmentData} ldapDepartmentData={ldapDepartmentData} handleClose={handleClose} />
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


