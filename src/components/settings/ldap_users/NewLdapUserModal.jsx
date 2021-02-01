import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {ldapUsersMetaData} from "components/settings/ldap_users/ldap-users-metadata";
import LdapUserEditorPanel from "components/settings/ldap_users/users_detail_view/LdapUserEditorPanel";
import CreateModal from "components/common/modal/CreateModal";

function NewLdapUserModal({ setShowModal, showModal, loadData, authorizedActions } ) {
  const [ldapUserData, setLdapUserData] = useState(undefined);

  useEffect(() => {
    setLdapUserData(new Model({...ldapUsersMetaData.newObjectFields}, ldapUsersMetaData, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"User"} showModal={showModal} loadData={loadData} >
      <LdapUserEditorPanel authorizedActions={authorizedActions} setLdapUserData={setLdapUserData} ldapUserData={ldapUserData} handleClose={handleClose} />
    </CreateModal>
  );
}

NewLdapUserModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default NewLdapUserModal;


