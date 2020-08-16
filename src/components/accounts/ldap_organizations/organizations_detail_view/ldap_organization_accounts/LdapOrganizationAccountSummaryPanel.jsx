import React, {useState} from "react";
import { Row, Col, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import LdapUsersTable from "../../../ldap_users/LdapUsersTable";
import LdapGroupsTable from "../../../ldap_groups/LdapGroupsTable";
import DtoTextField from "../../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../../common/form_fields/dto_form_fields/dto-toggle-field";
import LdapIdpAccountSummaryPanel from "../idp_accounts/LdapIdpAccountSummaryPanel";
import LdapIdpAccountEditorPanel from "../idp_accounts/LdapIdpAccountEditorPanel";

function LdapOrganizationAccountSummaryPanel({ldapOrganizationAccountData, ldapIdpAccountData, setShowEditorPanel, handleBackButton}) {
  const [showIdpEditPanel, setShowIdpEditPanel] = useState(false);
  return (
    ldapOrganizationAccountData &&
    <>
      <div className="mb-2 text-muted">
        {/*TODO: Implement overlay*/}
        {/*<OverlayTrigger*/}
        {/*  placement="top"*/}
        {/*  delay={{ show: 250, hide: 400 }}*/}
        {/*  // overlay={renderTooltip({ message: "Edit this account" })}*/}
        {/*>*/}
        <FontAwesomeIcon icon={faCogs} className="pointer float-right ml-3" onClick={() => {
          setShowEditorPanel(true);
        }}/>
        {/*</OverlayTrigger>*/}
        {console.log("ldapOrganizationAccountData: " + JSON.stringify(ldapOrganizationAccountData))}
        <div className="pt-1">
          <hr/>
        </div>
      </div>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"orgOwner"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"orgOwnerEmail"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"accountName"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"description"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"idpVendor"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"idpPostURL"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"idpReturnAttributes"} />
          {/*TODO: Find better way to show these*/}
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"configEntryType"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"entityID"} />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <DtoToggleField fieldName={"isMultipleIDP"} dataObject={ldapOrganizationAccountData} />
        </Col>
        <Col lg={6}>
          <DtoToggleField fieldName={"localAuth"} dataObject={ldapOrganizationAccountData} />
        </Col>
        <Col lg={6}>
          <DtoToggleField fieldName={"samlEnabled"} dataObject={ldapOrganizationAccountData} />
        </Col>
        <Col lg={6}>
          <DtoToggleField fieldName={"oAuthEnabled"} dataObject={ldapOrganizationAccountData} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div className="mb-3">
            <div className="text-center mb-1"><span className="text-muted mr-2">Users</span></div>
            {console.log("ldapOrganizationAccountData: " + JSON.stringify(ldapOrganizationAccountData))}
            <LdapUsersTable orgDomain={ldapOrganizationAccountData["orgDomain"]} userData={ldapOrganizationAccountData.getData("users")} />
          </div>
        </Col>
        <Col lg={12}>
          <div className="mb-3">
            <div className="text-center mb-1"><span className="text-muted mr-2">Groups</span></div>
            <LdapGroupsTable orgDomain={ldapOrganizationAccountData["orgDomain"]} groupData={ldapOrganizationAccountData.getData("groups")} />
          </div>
        </Col>
        <Col lg={12}>
          <div className="content-container content-card-1 mb-3">
            <div className="pt-2 pl-2 content-block-header">
              <h6>Idp Account Details</h6>
            </div>
            <div>
              {showIdpEditPanel || ldapIdpAccountData.isNew()
                ? <LdapIdpAccountEditorPanel ldapOrganizationAccountData={ldapOrganizationAccountData} ldapIdpAccountData={ldapIdpAccountData} />
                : <LdapIdpAccountSummaryPanel ldapIdpAccountData={ldapIdpAccountData} />
              }
            </div>
            <div className="content-block-footer" />
          </div>
        </Col>
      </Row>
      <Row>
          <div className="ml-auto mr-3">
            <Button size="sm" variant="secondary" onClick={() => handleBackButton()}>Back to Accounts</Button>
          </div>
      </Row>
    </>
  );
}

LdapOrganizationAccountSummaryPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  ldapIdpAccountData: PropTypes.object,
  setShowEditorPanel: PropTypes.func,
  handleBackButton: PropTypes.func
};

export default LdapOrganizationAccountSummaryPanel;
