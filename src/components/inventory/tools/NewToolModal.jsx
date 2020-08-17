import React, {useState, useContext, useEffect} from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Model from "../../../core/data_model/model";
import {unsavedChanges} from "../../common/tooltip/popover-text";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";
import toolMetadata from "./tool-metadata";
import ToolEditorPanel from "./tool_details/ToolEditorPanel";
import CreateModal from "../../common/modal/CreateModal";
import LdapOrganizationAccountEditorPanel
  from "../../accounts/ldap_organizations/organizations_detail_view/ldap_organization_accounts/LdapOrganizationAccountEditorPanel";

const INITIAL_TOOL_DATA = {
  name: "",
  description: "",
  tool_identifier: "",
  compliance: [],
  licensing: [],
  location: [],
  projects: [],
  contacts: [],
  applications: [],
  organization: [],
  external_reference: [],
  active: true,
  roles: [],
  configuration: {},
  status: "",
  tags: []
};

function NewToolModal({ onModalClose, showModal } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolData, loadData] = useState(undefined);

  useEffect(() => {
    loadData(new Model(INITIAL_TOOL_DATA, toolMetadata, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Tool"} showModal={showModal} >
        {toolData && <ToolEditorPanel loadData={loadData} handleClose={handleClose} toolData={toolData} />}
      </CreateModal>
    </>
  );
}

NewToolModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewToolModal;


