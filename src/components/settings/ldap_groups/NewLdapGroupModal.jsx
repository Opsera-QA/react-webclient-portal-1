import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./ldap_group_detail/LdapGroupEditorPanel";
import Model from "../../../core/data_model/model";
import {ldapGroupMetaData} from "./ldap-groups-metadata";
import CreateModal from "../../common/modal/CreateModal";

function NewLdapUserModal({ orgDomain, authorizedActions, currentUserEmail, setShowModal, showModal, loadData }) {
  const [ldapGroupData, setLdapGroupData] = useState(undefined);

  useEffect(() => {
    setLdapGroupData(new Model({...ldapGroupMetaData.newObjectFields}, ldapGroupMetaData, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Group"} showModal={showModal} loadData={loadData}>
        <LdapGroupEditorPanel authorizedActions={authorizedActions} currentUserEmail={currentUserEmail} ldapGroupData={ldapGroupData} handleClose={handleClose} orgDomain={orgDomain} />
    </CreateModal>
  );
}

NewLdapUserModal.propTypes = {
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array,
  currentUserEmail: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewLdapUserModal;


