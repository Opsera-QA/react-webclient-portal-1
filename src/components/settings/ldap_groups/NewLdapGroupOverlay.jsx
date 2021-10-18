import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./details/LdapGroupEditorPanel";
import Model from "core/data_model/model";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import CreateModal from "components/common/modal/CreateModal";

function NewLdapGroupOverlay({ orgDomain, authorizedActions, currentUserEmail, setShowModal, showModal, loadData, existingGroupNames }) {
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
      <LdapGroupEditorPanel
        authorizedActions={authorizedActions}
        currentUserEmail={currentUserEmail}
        ldapGroupData={ldapGroupData}
        handleClose={handleClose}
        orgDomain={orgDomain}
        existingGroupNames={existingGroupNames}
      />
    </CreateModal>
  );
}

NewLdapGroupOverlay.propTypes = {
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array,
  currentUserEmail: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  existingGroupNames: PropTypes.array
};

export default NewLdapGroupOverlay;


