import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import LdapOrganizationEditorPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationEditorPanel";
import CreateModal from "components/common/modal/CreateModal";

function NewLdapOrganizationModal({ setShowModal, showModal, loadData, authorizedActions }) {
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationData(new Model({...ldapOrganizationMetaData.newObjectFields}, ldapOrganizationMetaData, true));
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    loadData();
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Organization"} showModal={showModal} loadData={loadData} >
      <LdapOrganizationEditorPanel authorizedActions={authorizedActions} setLdapOrganizationData={setLdapOrganizationData} newLdapOrganization={true} handleClose={handleClose} ldapOrganizationData={ldapOrganizationData} />
    </CreateModal>
  );
}

NewLdapOrganizationModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default NewLdapOrganizationModal;


