import React from "react";
import {OverlayTrigger, Row, Col, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import TextField from "../../../../common/form_fields/text-field";
import {ldapOrganizationAccountFormFields} from "../../ldap-organization-account-form-fields";
import ToggleField from "../../../../common/form_fields/toggle-field";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import LdapUsersTable from "../../../ldap_users/LdapUsersTable";
import LdapGroupsTable from "../../../ldap_groups/LdapGroupsTable";

function LdapOrganizationAccountSummaryPanel({ldapOrganizationAccountData, setShowEditorPanel, handleBackButton}) {
  let fields = ldapOrganizationAccountFormFields;

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
          <TextField field={fields["orgOwner"]} value={ldapOrganizationAccountData.orgOwner}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["orgOwnerEmail"]} value={ldapOrganizationAccountData.orgOwnerEmail}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["name"]} value={ldapOrganizationAccountData.name}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["accountName"]} value={ldapOrganizationAccountData.accountName}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["description"]} value={ldapOrganizationAccountData.description}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["idpVendor"]} value={ldapOrganizationAccountData.idpVendor}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["idpPostURL"]} value={ldapOrganizationAccountData.idpPostURL}/>
        </Col>
        <Col lg={6}>
          {/*TODO: Find better way to show these*/}
          <TextField field={fields["idpReturnAttributes"]} value={JSON.stringify(ldapOrganizationAccountData.idpReturnAttributes)}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["configEntryType"]} value={ldapOrganizationAccountData.configEntryType}/>
        </Col>
        <Col lg={6}>
          <TextField field={fields["entityID"]} value={ldapOrganizationAccountData.entityID}/>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <ToggleField field={fields["isMultipleIDP"]} value={ldapOrganizationAccountData.isMultipleIDP}/>
        </Col>
        <Col lg={6}>
          <ToggleField field={fields["localAuth"]} value={ldapOrganizationAccountData.localAuth}/>
        </Col>
        <Col lg={6}>
          <ToggleField field={fields["samlEnabled"]} value={ldapOrganizationAccountData.isMultipleIDP}/>
        </Col>
        <Col lg={6}>
          <ToggleField field={fields["oAuthEnabled"]} value={ldapOrganizationAccountData.localAuth}/>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div className="mb-3">
            <div className="text-center mb-1"><span className="text-muted mr-2">Users</span></div>
            <LdapUsersTable orgDomain={ldapOrganizationAccountData.orgDomain} userData={ldapOrganizationAccountData.users} />
          </div>
        </Col>
        <Col lg={12}>
          <div className="mb-3">
            <div className="text-center mb-1"><span className="text-muted mr-2">Groups</span></div>
            <LdapGroupsTable orgDomain={ldapOrganizationAccountData.orgDomain} data={ldapOrganizationAccountData.gr} />
          </div>
        </Col>
        {/*<Col lg={12}>*/}
        {/*  <TextField field={fields["users"]} value={ldapOrganizationAccountData.users} />*/}
        {/*</Col>*/}
        {/*<Col lg={12}>*/}
        {/*  <TextField field={fields["groups"]} value={ldapOrganizationAccountData.groups} />*/}
        {/*</Col>*/}
      </Row>
      <Row>
          <div className="ml-auto">
            <Button size="sm" variant="secondary" onClick={() => handleBackButton()}>Back to Accounts</Button>
          </div>
      </Row>
    </>
  );
}

LdapOrganizationAccountSummaryPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  setShowEditorPanel: PropTypes.func,
  handleBackButton: PropTypes.func
};

export default LdapOrganizationAccountSummaryPanel;
