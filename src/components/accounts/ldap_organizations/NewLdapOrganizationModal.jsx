import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import LdapOrganizationEditorPanel from "./organizations_detail_view/LdapOrganizationEditorPanel";
import Model from "../../../core/data_model/model";
import {ldapOrganizationMetaData} from "./ldap-organizations-form-fields";
import CreateModal from "../../common/modal/CreateModal";

const INITIAL_ORGANIZATION_DATA = {
  name: "",
  description: "",
  envCount: "5",
  numberOfLicenses: "2000",
  objectCount: "50000",
  orgName: "",
  orgOwner: "",
  orgOwnerEmail: "",
  subscription: ["apps", "eventHooks"]
};

function NewLdapOrganizationModal({ onModalClose, showModal } ) {
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationData(new Model(INITIAL_ORGANIZATION_DATA, ldapOrganizationMetaData, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Organization"} showModal={showModal} >
        {ldapOrganizationData && <LdapOrganizationEditorPanel setLdapOrganizationData={setLdapOrganizationData} newLdapOrganization={true} handleClose={handleClose} ldapOrganizationData={ldapOrganizationData} />}
      </CreateModal>
    </>
  );
}

NewLdapOrganizationModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapOrganizationModal;


