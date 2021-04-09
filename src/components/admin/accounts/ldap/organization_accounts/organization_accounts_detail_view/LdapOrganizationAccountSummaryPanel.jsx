import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import StandaloneLinkField from "components/common/fields/link/standalone/StandaloneLinkField";

function LdapOrganizationAccountSummaryPanel({ ldapOrganizationAccountData, setActiveTab }) {
  const getUrlString = () => {
    const urlString = "" + process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL + "/account/registration/" + ldapOrganizationAccountData?.orgDomain;
    return (
      <StandaloneLinkField label={"New User Registration URL"} link={urlString} openInNewWindow={true} showClipboardButton={true} />
    );
  };

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"orgOwner"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"orgOwnerEmail"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"orgDomain"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"accountName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"idpVendor"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"idpPostURL"}/>
        </Col>
        <Col lg={6}>
          <GenericItemField dataObject={ldapOrganizationAccountData} fieldName={"idpReturnAttributes"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"configEntryType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"entityID"}/>
        </Col>
        <Col lg={6}>
          <BooleanField fieldName={"isMultipleIDP"} dataObject={ldapOrganizationAccountData}/>
        </Col>
        <Col lg={6}>
          <BooleanField fieldName={"localAuth"} dataObject={ldapOrganizationAccountData}/>
        </Col>
        <Col lg={6}>
          <BooleanField fieldName={"samlEnabled"} dataObject={ldapOrganizationAccountData}/>
        </Col>
        <Col lg={6}>
          <BooleanField fieldName={"oAuthEnabled"} dataObject={ldapOrganizationAccountData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationAccountData} fieldName={"idpBaseUrl"}/>
        </Col>
        <Col lg={6}>
          {getUrlString()}
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
