import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import SummaryActionBar from "../../../../../common/actions/SummaryActionBar";
import LoadingDialog from "../../../../../common/status_notifications/loading";

function LdapOrganizationSummaryPanel({ldapOrganizationData}) {

  if (ldapOrganizationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      <div className="scroll-y pt-2 px-3">
        <SummaryActionBar backButtonPath={"/admin/organizations"}/>
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
          {ldapOrganizationData &&
          <Row className="mt-1">
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
          }
        </div>
      </div>
    </>
  );
}

LdapOrganizationSummaryPanel.propTypes = {
  ldapOrganizationData: PropTypes.object
};

export default LdapOrganizationSummaryPanel;
