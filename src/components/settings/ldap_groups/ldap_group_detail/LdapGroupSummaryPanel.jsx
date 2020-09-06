import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import TextField from "../../../common/form_fields/text-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";

function LdapGroupSummaryPanel({ldapGroupData, domain}) {

  if (ldapGroupData == null) {
    return <></>;
  }

  return (
    <>
      <div className="scroll-y pt-2 px-3">
        <SummaryActionBar backButtonPath={`/settings/${domain}/groups`} />
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={ldapGroupData} fieldName={"name"} />
            </Col>
            <Col lg={6}>
              {/*TODO: Pull through orgObject with its metadata once set up*/}
              <TextField label={"Domain"} value={domain} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapGroupData} fieldName={"groupType"} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapGroupData} fieldName={"externalSyncGroup"} />
            </Col>
            <Col lg={6}>
              <DtoToggleField dataObject={ldapGroupData} fieldName={"isSync"} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={ldapGroupData} fieldName={"ownerEmail"} />
            </Col>
          </Row>
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
