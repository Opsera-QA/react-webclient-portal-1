import React from "react";
import {Row, Col} from "react-bootstrap";
import TextField from "../../../common/form_fields/text-field";
import ldapGroupFormFields from "../ldap-groups-form-fields";
import ToggleField from "../../../common/form_fields/toggle-field";
import PropTypes from "prop-types";

function LdapGroupSummaryPanel({ldapGroupData, domain}) {
  let fields = ldapGroupFormFields;

  return (
    <>
      <div className="scroll-y pt-3 px-3">
        <div className="mb-3 flat-top-content-block p-3">
          {ldapGroupData &&
          <Row>
            <Col lg={6}>
              <TextField field={fields.name} value={ldapGroupData.name}/>
            </Col>
            <Col lg={6}>
              <TextField field={fields.domain} value={domain}/>
            </Col>
            <Col lg={6}>
              <TextField field={fields.configGroupType} value={ldapGroupData.configGroupType}/>
            </Col>
            <Col lg={6}>
              <TextField field={fields.externalSyncGroup} value={ldapGroupData.externalSyncGroup}/>
            </Col>
            <Col lg={6}>
              <ToggleField field={fields.isSync} value={ldapGroupData.isSync}/>
            </Col>
          </Row>
          }
        </div>
      </div>
    </>
  );
}

LdapGroupSummaryPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  domain: PropTypes.string,
};


export default LdapGroupSummaryPanel;
