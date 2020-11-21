import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import DetailPanelContainer from "../../../../../common/panels/detail_panel_container/DetailPanelContainer";

function LdapOrganizationSummaryPanel({ldapOrganizationData}) {

  if (ldapOrganizationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <DetailPanelContainer showRequiredFieldsMessage={false}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"orgName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"envCount"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"numberOfLicenses"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"objectCount"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"orgOwner"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"orgOwnerEmail"}/>
        </Col>
      </Row>
    </DetailPanelContainer>
  );
}

LdapOrganizationSummaryPanel.propTypes = {
  ldapOrganizationData: PropTypes.object
};

export default LdapOrganizationSummaryPanel;
