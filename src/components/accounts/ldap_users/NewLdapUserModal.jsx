import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
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

function NewLdapUserModal({ onModalClose, showModal } ) {
  const [ldapUserData, setLdapUserData] = useState(undefined);

  useEffect(() => {
    setLdapUserData(new Model(INITIAL_USER_DATA, ldapUsersMetaData, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"User"} showModal={showModal} >
        {ldapUserData && <LdapUserEditorPanel setLdapUserData={setLdapUserData} handleClose={handleClose} ldapUserData={ldapUserData} />}
      </CreateModal>
    </>
  );
}

NewLdapUserModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapUserModal;


