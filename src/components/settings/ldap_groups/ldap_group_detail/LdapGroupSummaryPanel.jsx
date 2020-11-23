import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import TextField from "../../../common/form_fields/text-field";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";

function LdapGroupSummaryPanel({ldapGroupData, domain}) {

  if (ldapGroupData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer>
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
      </Row>
    </SummaryPanelContainer>
  );
}

LdapGroupSummaryPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  domain: PropTypes.string,
};


export default LdapGroupSummaryPanel;
