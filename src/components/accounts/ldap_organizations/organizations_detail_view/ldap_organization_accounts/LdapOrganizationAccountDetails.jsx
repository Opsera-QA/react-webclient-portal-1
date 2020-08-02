import React from "react";
import {OverlayTrigger, Row, Col, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import TextField from "../../../../common/form_fields/text-field";
import {ldapOrganizationAccountFormFields} from "../../ldap-organization-account-form-fields";
import ToggleField from "../../../../common/form_fields/toggle-field";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";

function LdapOrganizationAccountDetails({ ldapOrganizationAccountData, setShowEditorPanel, handleBackButton }){
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
            <FontAwesomeIcon icon={faCogs} className="pointer float-right ml-3" onClick={() => {setShowEditorPanel(true);}}/>
        {/*</OverlayTrigger>*/}
        <div className="pt-1"><hr/></div>
      </div>
      <Row>
        <Col>
          <TextField field={fields["org"]} value={ldapOrganizationAccountData.org} />
        </Col>
        <Col>
          <TextField field={fields["description"]} value={ldapOrganizationAccountData.description} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField field={fields["idpPostURL"]} value={ldapOrganizationAccountData.idpPostURL} />
        </Col>
        <Col>
          <TextField field={fields["idpVendor"]} value={ldapOrganizationAccountData.idpVendor} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField field={fields["idpReturnAttributes"]} value={ldapOrganizationAccountData.idpReturnAttributes} />
        </Col>
        <Col>
          <TextField field={fields["entityID"]} value={ldapOrganizationAccountData.entityID} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField field={fields["configEntryType"]} value={ldapOrganizationAccountData.configEntryType} />
        </Col>
        <Col>
          <TextField field={fields["entityID"]} value={ldapOrganizationAccountData.entityID} />
        </Col>
      </Row>
      <Row>
        {/*<Col>*/}
        {/*  <TextField field={fields["users"]} value={ldapOrganizationAccountData.users} />*/}
        {/*</Col>*/}
        {/*<Col>*/}
        {/*  <TextField field={fields["groups"]} value={ldapOrganizationAccountData.groups} />*/}
        {/*</Col>*/}
      </Row>
      <Row>
        <Col>
          <ToggleField field={fields["isMultipleIDP"]} value={ldapOrganizationAccountData.isMultipleIDP} />
        </Col>
        <Col>
          <ToggleField field={fields["localAuth"]} value={ldapOrganizationAccountData.localAuth} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ToggleField field={fields["samlEnabled"]} value={ldapOrganizationAccountData.isMultipleIDP} />
        </Col>
        <Col>
          <ToggleField field={fields["oAuthEnabled"]} value={ldapOrganizationAccountData.localAuth} />
        </Col>
      </Row>
      <Row>
        <div className="ml-auto">
          <Button size="sm" variant="secondary" onClick={() => handleBackButton()}>Back to Accounts</Button>
        </div>
      </Row>
    </>
  );
}

LdapOrganizationAccountDetails.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  setShowEditorPanel: PropTypes.func,
  handleBackButton: PropTypes.func
};

export default LdapOrganizationAccountDetails;
