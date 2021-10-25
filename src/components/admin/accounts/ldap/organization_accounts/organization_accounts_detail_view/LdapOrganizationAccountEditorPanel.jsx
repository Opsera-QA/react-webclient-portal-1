import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import IdpVendorSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_idp_accounts/IdpVendorSelectInput";
import LdapOrganizationAccountOpseraUserSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOrganizationAccountOpseraUserSelectInput";

function LdapOrganizationAccountEditorPanel({ldapOrganizationAccountData, ldapOrganization, setLdapOrganizationAccountData, authorizedActions, handleClose}) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapOrganizationAccountDataDto, setLdapOrganizationAccountDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await unpackLdapOrganizationAccountData();
    setIsLoading(false);
  };

  const unpackLdapOrganizationAccountData = async () => {
    let ldapOrganizationAccountDataDto = ldapOrganizationAccountData;
    if (ldapOrganizationAccountDataDto.isNew() && ldapOrganization != null) {
      let orgDomain = ldapOrganization.orgOwnerEmail.substring(ldapOrganization.orgOwnerEmail.lastIndexOf("@") + 1);
      ldapOrganizationAccountDataDto.setData("orgDomain", orgDomain);
      ldapOrganizationAccountDataDto.setData("name", ldapOrganization["name"] + "-acc");
      ldapOrganizationAccountDataDto.setData("org", ldapOrganization["name"] != null ? ldapOrganization["name"] : "");
    }
    setLdapOrganizationAccountDataDto(ldapOrganizationAccountDataDto);
  };

  const updateLdapOrganizationAccount = async () => {
    return await accountsActions.updateOrganizationAccount(ldapOrganizationAccountDataDto, getAccessToken);
  };

  const createOrganizationAccount = async () => {
    return await accountsActions.createOrganizationAccount(ldapOrganizationAccountDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("update_organization_account")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this organization account"} />;
  }

  return (
    <EditorPanelContainer
      createRecord={createOrganizationAccount}
      updateRecord={updateLdapOrganizationAccount}
      setRecordDto={setLdapOrganizationAccountDataDto}
      recordDto={ldapOrganizationAccountDataDto}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <LdapOrganizationAccountOpseraUserSelectInput
            model={ldapOrganizationAccountDataDto}
            setModel={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={!ldapOrganizationAccountDataDto.isNew()} fieldName={"orgOwner"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"orgOwnerEmail"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={!ldapOrganizationAccountDataDto.isNew()}
            fieldName={"orgDomain"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={!ldapOrganizationAccountDataDto.isNew()}
            fieldName={"name"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"accountName"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"configEntryType"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <IdpVendorSelectInput
            fieldName={"idpVendor"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"entityID"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"idpPostURL"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"idpBaseUrl"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        {/*<Col>*/}
        {/*  <ItemInput field={fields.idpReturnAttributes} setData={setFormField}*/}
        {/*             formData={formData}/>*/}
        {/*</Col>*/}
        <Col lg={12}>
          <BooleanToggleInput
            disabled={true}
            fieldName={"isMultipleIDP"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            fieldName={"localAuth"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            fieldName={"samlEnabled"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            fieldName={"oAuthEnabled"}
            dataObject={ldapOrganizationAccountDataDto}
            setDataObject={setLdapOrganizationAccountDataDto}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

LdapOrganizationAccountEditorPanel.propTypes = {
  ldapOrganization: PropTypes.object,
  ldapOrganizationAccountData: PropTypes.object,
  setLdapOrganizationAccountData: PropTypes.func,
  authorizedActions: PropTypes.array,
  handleClose: PropTypes.func
};

export default LdapOrganizationAccountEditorPanel;


