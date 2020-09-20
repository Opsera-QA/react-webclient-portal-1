import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import LdapOrganizationAccountEditorPanel from "./organization_accounts_detail_view/LdapOrganizationAccountEditorPanel";
import Model from "../../../../../core/data_model/model";
import {ldapOrganizationAccountMetaData} from "./ldap-organization-account-form-fields";
import CreateModal from "../../../../common/modal/CreateModal";

function NewLdapOrganizationAccountModal({ setShowModal, showModal, ldapOrganizationData, loadData,authorizedActions } ) {
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationAccountData(new Model({...ldapOrganizationAccountMetaData.newObjectFields}, ldapOrganizationAccountMetaData, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
    loadData();
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Organization Account"} showModal={showModal} loadData={loadData} >
        {ldapOrganizationAccountData && <LdapOrganizationAccountEditorPanel authorizedActions={authorizedActions} ldapOrganization={ldapOrganizationData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} handleClose={handleClose} ldapOrganizationAccountData={ldapOrganizationAccountData} />}
      </CreateModal>
    </>
  );
}

NewLdapOrganizationAccountModal.propTypes = {
  ldapOrganizationData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default NewLdapOrganizationAccountModal;


