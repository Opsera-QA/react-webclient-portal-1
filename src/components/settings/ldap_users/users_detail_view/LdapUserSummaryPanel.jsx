import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";

function LdapUserSummaryPanel({ ldapUserData, orgDomain } ) {

  if (ldapUserData == null) {
    return <></>;
  }

  return (
    <>
        <div className="scroll-y pt-2 px-3">
          <SummaryActionBar backButtonPath={`/settings/${orgDomain}/users`} />
          <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
            <Row>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"firstName"} />
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"lastName"} />
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"name"} />
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"preferredName"} />
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"emailAddress"} />
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"site"} />
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"departmentName"} />
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={ldapUserData} fieldName={"title"} />
              </Col>
            </Row>
          </div>
        </div>
    </>
  );
}

LdapUserSummaryPanel.propTypes = {
  ldapUserData: PropTypes.object,
  orgDomain: PropTypes.string
};


export default LdapUserSummaryPanel;
