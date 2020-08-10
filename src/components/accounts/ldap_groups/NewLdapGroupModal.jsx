import React, {useEffect, useState} from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./ldap_group_detail/LdapGroupEditorPanel";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";
import {unsavedChanges} from "../../common/tooltip/popover-text";
import Model from "../../../core/data_model/model";
import {ldapGroupMetaData} from "./ldap-groups-metadata";

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
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              {ldapGroupData && <LdapGroupEditorPanel currentUserEmail={currentUserEmail} ldapGroupData={ldapGroupData} handleClose={handleClose} ldapOrganizationData={ldapOrganizationData} />}
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
  currentUserEmail: PropTypes.string,
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapUserModal;


