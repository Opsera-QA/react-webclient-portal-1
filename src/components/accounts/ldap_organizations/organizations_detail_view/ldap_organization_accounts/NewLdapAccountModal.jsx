import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import Model from "../../../../../core/data_model/model";
import {ldapOrganizationAccountMetaData} from "../../ldap-organization-account-form-fields";
import CreateModal from "../../../../common/modal/CreateModal";

const INITIAL_ORGANIZATION_ACCOUNT_DATA = {
  org: "",
  name: "",
  localAuth: true,
  samlEnabled: true,
  oAuthEnabled: true,
  idpPostURL: "https://testurl.com",
  idpVendor: "OKTA",
  configEntryType: "Not sure",
  entityID: "https://dev-842100.oktapreview.com",
  description: "",
  isMultipleIDP: false,
  idpReturnAttributes: [
    "mail",
    "cn"],
  accountName: "",
  orgDomain: "",
  administrator: {}
};

function NewLdapAccountModal({ setShowModal, showModal, ldapOrganizationData, loadData } ) {
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationAccountData(new Model({...INITIAL_ORGANIZATION_ACCOUNT_DATA}, ldapOrganizationAccountMetaData, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Organization Account"} showModal={showModal} loadData={loadData} >
        {ldapOrganizationAccountData && <LdapOrganizationAccountEditorPanel ldapOrganization={ldapOrganizationData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} handleClose={handleClose} ldapOrganizationAccountData={ldapOrganizationAccountData} />}
      </CreateModal>
    </>
  );
}

NewLdapAccountModal.propTypes = {
  ldapOrganizationData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewLdapAccountModal;


