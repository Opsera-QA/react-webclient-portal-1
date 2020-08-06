import React, { useState } from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./ldap_group_detail/LdapGroupEditorPanel";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";
import {unsavedChanges} from "../../common/tooltip/popover-text";

const INITIAL_GROUP_DATA = {
  name: "",
  configGroupType: ["Role"],
  externalSyncGroup: "",
  isSync: true,
};

function NewLdapUserModal({ ldapOrganizationData, onModalClose, showModal } ) {
  const [ldapGroupData, setLdapGroupData] = useState(INITIAL_GROUP_DATA);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <LdapGroupEditorPanel ldapGroupData={ldapGroupData} newLdapGroup={true} handleClose={handleClose} ldapOrganizationData={ldapOrganizationData} />
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

NewLdapUserModal.propTypes = {
  ldapOrganizationData: PropTypes.object,
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapUserModal;


