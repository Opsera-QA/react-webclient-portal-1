import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {ldapOrganizationAccountMetaData} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import LdapOrganizationAccountEditorPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountEditorPanel";
import CreateModal from "components/common/modal/CreateModal";

function CreateLdapOrganizationAccountOverlay({ setShowModal, showModal, ldapOrganizationData, loadData } ) {
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationAccountData(new Model({...ldapOrganizationAccountMetaData.newObjectFields}, ldapOrganizationAccountMetaData, true));
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    loadData();
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Organization Account"} showModal={showModal} loadData={loadData} >
      <LdapOrganizationAccountEditorPanel
        ldapOrganization={ldapOrganizationData}
        setLdapOrganizationAccountData={setLdapOrganizationAccountData}
        handleClose={handleClose}
        ldapOrganizationAccountData={ldapOrganizationAccountData}
      />
     </CreateModal>
  );
}

CreateLdapOrganizationAccountOverlay.propTypes = {
  ldapOrganizationData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default CreateLdapOrganizationAccountOverlay;


