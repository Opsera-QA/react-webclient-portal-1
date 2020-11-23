import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../../../common/form_fields/dto_form_fields/dto-item-field";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../../../common/panels/detail_view/SummaryPanelContainer";

function LdapOrganizationAccountSummaryPanel({ ldapOrganizationAccountData, setActiveTab }) {

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
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
    </SummaryPanelContainer>
  );
}

LdapOrganizationAccountSummaryPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default LdapOrganizationAccountSummaryPanel;
