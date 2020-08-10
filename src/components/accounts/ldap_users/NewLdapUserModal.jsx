import React, {useState, useContext, useEffect} from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LdapUserEditorPanel from "./users_detail_view/LdapUserEditorPanel";
import Model from "../../../core/data_model/model";
import {ldapGroupMetaData} from "../ldap_groups/ldap-groups-metadata";
import {ldapUsersMetaData} from "./ldap-users-metadata";
import {unsavedChanges} from "../../common/tooltip/popover-text";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";

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
  const { getAccessToken } = useContext(AuthContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);

  useEffect(() => {
    setLdapUserData(new Model(INITIAL_USER_DATA, ldapUsersMetaData, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New LDAP User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              {ldapUserData && <LdapUserEditorPanel setLdapUserData={setLdapUserData} handleClose={handleClose} ldapUserData={ldapUserData} />}
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
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapUserModal;


