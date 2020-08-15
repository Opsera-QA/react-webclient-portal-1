import React from "react";
import { Row, Col, Button} from "react-bootstrap";
import DtoTextField from "../../../../common/form_fields/dto_form_fields/dto-text-field";
import PropTypes from "prop-types";

function LdapIdpAccountSummaryPanel({ldapIdpAccountData}) {
  return (
    ldapIdpAccountData &&
    <>
      <div className="p-3 text-muted">
        <Row>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"name"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"domain"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"idpRedirectURI"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"clientID"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"issuer"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"baseUrl"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"idpVendor"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"configEntryType"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={ldapIdpAccountData} fieldName={"idpNameIDMapping"} />
          </Col>
        </Row>
      </div>
    </>
  );
}

LdapIdpAccountSummaryPanel.propTypes = {
  ldapIdpAccountData: PropTypes.object,
};

export default LdapIdpAccountSummaryPanel;
