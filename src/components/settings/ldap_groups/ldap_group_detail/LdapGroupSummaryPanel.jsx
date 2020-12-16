import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import TextField from "../../../common/form_fields/text-field";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";
import LdapGroupPermissionsField from "./LdapGroupPermissionsField";

function LdapGroupSummaryPanel({ ldapGroupData, domain, setActiveTab }) {

  if (ldapGroupData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={ldapGroupData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          {/*TODO: Pull through orgObject with its metadata once set up*/}
          <TextField label={"Domain"} value={domain}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapGroupData} fieldName={"groupType"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapGroupData} fieldName={"externalSyncGroup"}/>
        </Col>
        <Col lg={6}>
          <DtoToggleField dataObject={ldapGroupData} fieldName={"isSync"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapGroupData} fieldName={"ownerEmail"}/>
        </Col>
        <Col lg={12}>
          <LdapGroupPermissionsField dataObject={ldapGroupData} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapGroupSummaryPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  domain: PropTypes.string,
  setActiveTab: PropTypes.func
};


export default LdapGroupSummaryPanel;
