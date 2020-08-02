import React from "react";
import {Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from "prop-types";
import TextField from "../../../common/form_fields/text-field";
import ldapOrganizationsFormFields from "../ldap-organizations-form-fields";

function LdapOrganizationSummaryPanel({organization}) {
  const fields = ldapOrganizationsFormFields;

  function renderTooltip(props) {
    const {message} = props;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  }

  return (
    <>
      <div className="scroll-y pt-3 px-3">
        <div className="mb-3 flat-top-content-block p-3">
          {
            (organization) ? (
                <>
                  <Row className="mt-1">
                    <Col lg={6}>
                      <TextField field={fields.orgName} value={organization.orgName} />
                    </Col>
                    <Col lg={6}>
                      <TextField field={fields.description} value={organization.description} />
                    </Col>
                    <Col lg={6}>
                      <TextField field={fields.envCount} value={organization.envCount} />
                    </Col>
                    <Col lg={6}>
                      <TextField field={fields.numberOfLicenses} value={organization.numberOfLicenses} />
                    </Col>
                    <Col lg={6}>
                      <TextField field={fields.objectCount} value={organization.objectCount} />
                    </Col>
                    <Col lg={6}>
                      <TextField field={fields.name} value={organization.name} />
                    </Col>
                    <Col lg={6}>
                      <TextField field={fields.orgOwner} value={organization.orgOwner} />
                    </Col>
                    <Col lg={6}>
                      <TextField field={fields.orgOwnerEmail} value={organization.orgOwnerEmail} />
                    </Col>
                  </Row>
                </>)
              : null
          }
        </div>
      </div>
    </>
  );
}

LdapOrganizationSummaryPanel.propTypes = {
  organization: PropTypes.object
};

export default LdapOrganizationSummaryPanel;
