import React from "react";
import { Row, Col} from "react-bootstrap";
import DtoTextField from "../../../../common/form_fields/dto_form_fields/dto-text-field";
import PropTypes from "prop-types";
import TooltipWrapper from "../../../../common/tooltip/tooltipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import WarningDialog from "../../../../common/status_notifications/WarningDialog";

function LdapIdpAccountSummaryPanel({ldapIdpAccountData, setShowIdpEditPanel, authorizedActions}) {
  if (!authorizedActions.includes("get_idp_account_details")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to view this IDP Account"} />;
  }

  return (
    ldapIdpAccountData &&
    <>
      <div className="p-3 text-muted">
        <div className="mb-2 text-muted">
          {authorizedActions.includes("update_idp_account") && <TooltipWrapper innerText={"Edit this Account"}>
            <FontAwesomeIcon icon={faCogs} className="pointer float-right ml-3" onClick={() => {
              setShowIdpEditPanel(true);
            }}/>
          </TooltipWrapper>}
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
  setShowIdpEditPanel: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapIdpAccountSummaryPanel;
