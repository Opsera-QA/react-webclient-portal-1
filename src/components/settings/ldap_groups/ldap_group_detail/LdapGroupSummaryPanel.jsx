import React, {useContext} from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import TextField from "../../../common/form_fields/text-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";
import SummaryActionBarContainer from "../../../common/actions/SummaryActionBarContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "../../../common/actions/buttons/ActionBarDeleteButton2";
import accountsActions from "../../../admin/accounts/accounts-actions";
import {AuthContext} from "../../../../contexts/AuthContext";

function LdapGroupSummaryPanel({ldapGroupData, domain}) {
  const { getAccessToken } = useContext(AuthContext)

  if (ldapGroupData == null) {
    return <></>;
  }

  const deleteGroup = () => {
    return accountsActions.deleteGroup(domain, ldapGroupData, getAccessToken);
  };

  const getSummaryActionBar = () => {
    return (
      <SummaryActionBarContainer>
        <div>
          <ActionBarBackButton path={`/settings/${domain}/groups`} />
        </div>
        <div>
          {/*TODO: Confirm who can delete groups*/}
          {/*{opseraAdmin && */}
          {/*<span className={"mr-2"}><ActionBarDeleteButton2 relocationPath={`/settings/${domain}/groups`} dataObject={ldapGroupData} handleDelete={deleteGroup}/></span>*/}
          {/*// }*/}
        </div>
      </SummaryActionBarContainer>
    );
  };

  return (
    <SummaryPanelContainer summaryActionBar={getSummaryActionBar()}>
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
    </SummaryPanelContainer>
  );
}

LdapGroupSummaryPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  domain: PropTypes.string,
};


export default LdapGroupSummaryPanel;
