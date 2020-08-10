import React, {useState, useEffect} from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import LdapOrganizationEditorPanel from "./organizations_detail_view/LdapOrganizationEditorPanel";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";
import {unsavedChanges} from "../../common/tooltip/popover-text";
import Model from "../../../core/data_model/model";
import {ldapOrganizationMetaData} from "./ldap-organizations-form-fields";

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
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              {ldapOrganizationData && <LdapOrganizationEditorPanel setLdapOrganizationData={setLdapOrganizationData} newLdapOrganization={true} handleClose={handleClose} ldapOrganizationData={ldapOrganizationData} />}
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

NewLdapOrganizationModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapOrganizationModal;


