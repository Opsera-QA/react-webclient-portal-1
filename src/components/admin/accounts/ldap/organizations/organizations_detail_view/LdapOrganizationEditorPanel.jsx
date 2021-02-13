import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import LdapOrganizationOpseraUserSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOrganizationOpseraUserSelectInput";

function LdapOrganizationEditorPanel({ ldapOrganizationData, setLdapOrganizationData, authorizedActions, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapOrganizationDataDto, setLdapOrganizationDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapOrganizationDataDto(ldapOrganizationData);
    setIsLoading(false);
  };

  const createOrganization = async () => {
    return await accountsActions.createOrganization(ldapOrganizationDataDto, getAccessToken);
  };

  const updateLdapOrganization = async () => {
    return await accountsActions.updateOrganization(ldapOrganizationDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions?.includes("update_organization")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this organization"} />;
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      recordDto={ldapOrganizationDataDto}
      setRecordDto={setLdapOrganizationDataDto}
      updateRecord={updateLdapOrganization}
      createRecord={createOrganization}
      addAnotherOption={false}
    >
      <Row>
        <Col lg={12}>
          <LdapOrganizationOpseraUserSelectInput dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto} />
        </Col>
        <Col lg={12}>
          <TextInputBase disabled={!ldapOrganizationDataDto.isNew()} fieldName={"name"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase fieldName={"description"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase fieldName={"orgName"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase disabled={true} fieldName={"orgOwner"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase disabled={true} fieldName={"orgOwnerEmail"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase disabled={true} fieldName={"envCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase disabled={true} fieldName={"numberOfLicenses"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase disabled={true} fieldName={"objectCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase disabled={true} fieldName={"subscription"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

LdapOrganizationEditorPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  setLdapOrganizationData: PropTypes.func,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapOrganizationEditorPanel;


