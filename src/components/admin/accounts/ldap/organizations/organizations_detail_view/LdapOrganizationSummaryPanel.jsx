import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function LdapOrganizationSummaryPanel({ ldapOrganizationData, setActiveTab }) {
  if (ldapOrganizationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"orgName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"envCount"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"numberOfLicenses"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"objectCount"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"orgOwner"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapOrganizationData} fieldName={"orgOwnerEmail"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapOrganizationSummaryPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default LdapOrganizationSummaryPanel;
