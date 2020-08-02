import React, { useState, useContext } from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";

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
  const { getAccessToken } = useContext(AuthContext);
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(INITIAL_ORGANIZATION_ACCOUNT_DATA);

  const handleClose = () => {
    onModalClose(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        All unsaved changes will be lost
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New Organization Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <LdapOrganizationAccountEditorPanel ldapOrganization={ldapOrganizationData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} newLdapOrganizationAccount={true} handleClose={handleClose} ldapOrganizationAccountData={ldapOrganizationAccountData} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
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


