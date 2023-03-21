import React, {useState, useContext} from "react";
import {Button, Modal, Popover, OverlayTrigger} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import LdapUserEditorPanel from "../users/details/LdapUserEditorPanel";

const INITIAL_DATA = {
  name: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  departmentName: "",
};

function NewOnboardLdapUserModal({onModalClose, showModal}) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapUserData, setLdapUserData] = useState(INITIAL_DATA);

  const handleClose = (saveUser) => {
    onModalClose(saveUser ? ldapUserData : undefined);
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
      <Modal size="lg" show={showModal} onHide={() => handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New LDAP User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <LdapUserEditorPanel showButton={false} setLdapUserData={setLdapUserData} newLdapUser={true}
                                   ldapUserData={ldapUserData}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="primary" onClick={() => handleClose(ldapUserData)}>Add User</Button>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={() => handleClose(undefined)}>Close</Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewOnboardLdapUserModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewOnboardLdapUserModal;


