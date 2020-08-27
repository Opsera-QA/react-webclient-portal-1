import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import LdapUserEditorPanel from "./users_detail_view/LdapUserEditorPanel";
import Model from "../../../core/data_model/model";
import {ldapUsersMetaData} from "./ldap-users-metadata";
import CreateModal from "../../common/modal/CreateModal";

const INITIAL_USER_DATA = {
  name: "",
  firstName: "",
  lastName: "",
  preferredName: "",
  emailAddress: "",
  departmentName: "",
  teams: [],
  division: "",
  site: "",
};

function NewLdapUserModal({ setShowModal, showModal, loadData } ) {
  const [ldapUserData, setLdapUserData] = useState(undefined);

  useEffect(() => {
    setLdapUserData(new Model({...INITIAL_USER_DATA}, ldapUsersMetaData, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"User"} showModal={showModal} loadData={loadData} >
        {ldapUserData && <LdapUserEditorPanel setLdapUserData={setLdapUserData} handleClose={handleClose} ldapUserData={ldapUserData} />}
      </CreateModal>
    </>
  );
}

NewLdapUserModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewLdapUserModal;


