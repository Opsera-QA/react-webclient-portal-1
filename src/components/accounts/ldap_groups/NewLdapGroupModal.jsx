import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./ldap_group_detail/LdapGroupEditorPanel";
import Model from "../../../core/data_model/model";
import {ldapGroupMetaData} from "./ldap-groups-metadata";
import CreateModal from "../../common/modal/CreateModal";

const INITIAL_GROUP_DATA = {
  name: "",
  groupType: "user",
  // TODO: Set Default Value When user groups can use it
  externalSyncGroup: undefined,
  isSync: true,
};

function NewLdapUserModal({ ldapOrganizationData, currentUserEmail, onModalClose, showModal } ) {
  const [ldapGroupData, setLdapGroupData] = useState(undefined);

  useEffect(() => {
    setLdapGroupData(new Model(INITIAL_GROUP_DATA, ldapGroupMetaData, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Group"} showModal={showModal} >
        {ldapGroupData && <LdapGroupEditorPanel currentUserEmail={currentUserEmail} ldapGroupData={ldapGroupData} handleClose={handleClose} ldapOrganizationData={ldapOrganizationData} />}
      </CreateModal>
    </>
  );
}

NewLdapUserModal.propTypes = {
  ldapOrganizationData: PropTypes.object,
  currentUserEmail: PropTypes.string,
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapUserModal;


