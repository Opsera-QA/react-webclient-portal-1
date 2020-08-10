import React, {useState, useEffect} from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import TooltipWrapper from "../../../../common/tooltip/tooltipWrapper";
import {unsavedChanges} from "../../../../common/tooltip/popover-text";
import Model from "../../../../../core/data_model/model";
import {ldapOrganizationAccountMetaData} from "../../ldap-organization-account-form-fields";

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

function NewLdapAccountModal({ onModalClose, showModal, ldapOrganizationData } ) {
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationAccountData(new Model(INITIAL_ORGANIZATION_ACCOUNT_DATA, ldapOrganizationAccountMetaData, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New Organization Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              {ldapOrganizationAccountData && <LdapOrganizationAccountEditorPanel ldapOrganization={ldapOrganizationData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} handleClose={handleClose} ldapOrganizationAccountData={ldapOrganizationAccountData} />}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <TooltipWrapper innerText={unsavedChanges}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </TooltipWrapper>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewLdapAccountModal.propTypes = {
  ldapOrganizationData: PropTypes.object,
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapAccountModal;


