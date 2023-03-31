import React, {useEffect, useState, useContext, useRef} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions.js";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";

// Note this is lowercase intentionally, as Users cannot create groups with capital letters
const reservedNames = ["administrators", "powerusers", "users", "securitymanagers", "auditors", "guests"];

function LdapGroupEditorPanel(
  {
    ldapGroupData,
    orgDomain,
    handleClose,
    existingGroupNames
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapGroupDataDto, setLdapGroupDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    userData,
    cancelTokenSource,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapGroupDataDto(ldapGroupData);
    setIsLoading(false);
  };

  const createGroup = async () => {
    const name = ldapGroupDataDto?.getData("name")?.toLowerCase()?.trim();

    if (existingGroupNames && existingGroupNames.indexOf(name) > -1) {
      throw `
        [${ldapGroupDataDto.getData("name")}] is a name already registered to a group. 
        Group names must be unique. Please try another name.
      `;
    }

    if (reservedNames.indexOf(name) > -1) {
      throw `[${ldapGroupDataDto.getData("name")}] is a reserved group name and cannot be used when creating a new group.`;
    }

    return await accountsActions.createGroupV2(getAccessToken, cancelTokenSource, orgDomain, ldapGroupDataDto, userData?.email);
  };

  const updateGroup = async () => {
    return await accountsActions.updateGroupV2(getAccessToken, cancelTokenSource, orgDomain, ldapGroupDataDto);
  };

  if (isLoading || ldapGroupDataDto == null) {
    return (<LoadingDialog />);
  }

  return (
    <EditorPanelContainer
      createRecord={createGroup}
      updateRecord={updateGroup}
      setRecordDto={setLdapGroupDataDto}
      recordDto={ldapGroupDataDto}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase
            disabled={ldapGroupDataDto?.isNew() !== true}
            fieldName={"name"}
            dataObject={ldapGroupDataDto}
            setDataObject={setLdapGroupDataDto}
          />
        </Col>
        {/*<Col lg={12}>*/}
        {/*  <TextInputBase*/}
        {/*    fieldName={"groupType"}*/}
        {/*    dataObject={ldapGroupDataDto}*/}
        {/*    setDataObject={setLdapGroupDataDto}*/}
        {/*    disabled={true}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Col lg={12}>*/}
        {/*  <TextInputBase*/}
        {/*    disabled={true}*/}
        {/*    fieldName={"externalSyncGroup"}*/}
        {/*    dataObject={ldapGroupDataDto}*/}
        {/*    setDataObject={setLdapGroupDataDto}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Col lg={12}>*/}
        {/*  <BooleanToggleInput*/}
        {/*    disabled={true}*/}
        {/*    fieldName={"isSync"}*/}
        {/*    dataObject={ldapGroupDataDto}*/}
        {/*    setDataObject={setLdapGroupDataDto}*/}
        {/*  />*/}
        {/*</Col>*/}
      </Row>
    </EditorPanelContainer>
  );
}

LdapGroupEditorPanel.propTypes = {
  orgDomain: PropTypes.string,
  setLdapGroupData: PropTypes.func,
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  handleClose: PropTypes.func,
  existingGroupNames: PropTypes.array
};

export default LdapGroupEditorPanel;


