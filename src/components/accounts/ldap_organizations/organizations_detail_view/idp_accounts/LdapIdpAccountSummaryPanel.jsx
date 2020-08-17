import React from "react";
import { Row, Col, Button} from "react-bootstrap";
import DtoTextField from "../../../../common/form_fields/dto_form_fields/dto-text-field";
import PropTypes from "prop-types";
import TooltipWrapper from "../../../../common/tooltip/tooltipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";

function LdapIdpAccountSummaryPanel({ldapIdpAccountData, setShowIdpEditPanel}) {
  return (
    ldapIdpAccountData &&
    <>
      <div className="p-3 text-muted">
        <div className="mb-2 text-muted">
          <TooltipWrapper innerText={"Edit this Account"}>
            <FontAwesomeIcon icon={faCogs} className="pointer float-right ml-3" onClick={() => {
              setShowIdpEditPanel(true);
            }}/>
          </TooltipWrapper>
          <div className="pt-1">
            <hr/>
          </div>
        </div>
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
  setShowIdpEditPanel: PropTypes.func
};

export default LdapIdpAccountSummaryPanel;
