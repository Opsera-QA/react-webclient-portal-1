import React, {useState} from "react";
import { Row, Col, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../../../common/form_fields/dto_form_fields/dto-item-field";
import SummaryActionBar from "../../../../../common/actions/SummaryActionBar";
import {useHistory} from "react-router-dom";

function LdapOrganizationAccountSummaryPanel({ldapOrganizationAccountData}) {
  const history = useHistory();

  if (ldapOrganizationAccountData == null) {
    return (<></>);
  }

  const handleBackButton = () => {
    history.push(`/accounts/organization-accounts/${ldapOrganizationAccountData["org"]["name"]}`);
  }

  return (
    <>
      <div className="scroll-y pt-3 px-3">
        <SummaryActionBar handleBackButton={handleBackButton} />
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
          <Row className="mt-1">
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"orgOwner"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"orgOwnerEmail"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"name"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"accountName"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"description"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"idpVendor"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"idpPostURL"}/>
            </Col>
            <Col lg={6}>
              <DtoItemField dataObject={ldapOrganizationAccountData} fieldName={"idpReturnAttributes"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"configEntryType"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapOrganizationAccountData} fieldName={"entityID"}/>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <DtoToggleField fieldName={"isMultipleIDP"} dataObject={ldapOrganizationAccountData}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField fieldName={"localAuth"} dataObject={ldapOrganizationAccountData}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField fieldName={"samlEnabled"} dataObject={ldapOrganizationAccountData}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField fieldName={"oAuthEnabled"} dataObject={ldapOrganizationAccountData}/>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

LdapOrganizationAccountSummaryPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  handleBackButton: PropTypes.func
};

export default LdapOrganizationAccountSummaryPanel;
