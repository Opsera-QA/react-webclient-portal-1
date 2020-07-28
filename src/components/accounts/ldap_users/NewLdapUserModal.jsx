import React, { useState, useContext } from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LdapUserEditorPanel from "./users_detail_view/LdapUserEditorPanel";

const INITIAL_DATA = {
  name: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  departmentName: "",
};

function NewLdapUserModal({ onModalClose, showModal } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapUserData, setLdapUserData] = useState(INITIAL_DATA);

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
          <Modal.Title>Create New LDAP User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <LdapUserEditorPanel setLdapUserData={setLdapUserData} newLdapUser={true} handleClose={handleClose} ldapUserData={ldapUserData} />
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

NewLdapUserModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapUserModal;


