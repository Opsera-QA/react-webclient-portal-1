import React from "react";
import {Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
          <div className="mb-2 text-muted">
            <OverlayTrigger
              placement="top"
              delay={{show: 250, hide: 400}}
              overlay={renderTooltip({message: "Delete this pipeline"})}>
              <FontAwesomeIcon icon={faTrash} className="pointer red float-right ml-3" onClick={() => {
              }}/></OverlayTrigger>

            {/*<OverlayTrigger*/}
            {/*  placement="top"*/}
            {/*  delay={{show: 250, hide: 400}}*/}
            {/*  overlay={renderTooltip({message: "Duplicate this pipeline configuration"})}>*/}
            {/*  <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" onClick={() => {*/}
            {/*  }}/></OverlayTrigger>*/}

            {/*<OverlayTrigger*/}
            {/*  placement="top"*/}
            {/*  delay={{show: 250, hide: 400}}*/}
            {/*  overlay={renderTooltip({message: "View Pipeline Configurations"})}>*/}
            {/*  <FontAwesomeIcon icon={faFileAlt}*/}
            {/*                   className="float-right text-muted ml-3"*/}
            {/*                   style={{cursor: "pointer"}}*/}
            {/*                   onClick={() => {*/}
            {/*                   }}/></OverlayTrigger>*/}
          </div>

          <div className="pt-1">
            <hr/>
          </div>
          {
            (organization) ? (
                <>
                  <Row className="mt-3">
                    <Col>
                      <TextField field={fields.orgName} value={organization.orgName} />
                    </Col>
                    <Col>
                      <TextField field={fields.description} value={organization.description} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField field={fields.envCount} value={organization.envCount} />
                    </Col>
                    <Col>
                      <TextField field={fields.numberOfLicenses} value={organization.numberOfLicenses} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField field={fields.objectCount} value={organization.objectCount} />
                    </Col>
                    {/*<Col>*/}
                    {/*  <TextField field={fields.subscription} value={organization.subscription} />*/}
                    {/*</Col>*/}
                  </Row>
                  <Row>
                    <Col>
                      <TextField field={fields.orgOwner} value={organization.orgOwner} />
                    </Col>
                    <Col>
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
