import React, {useState, useEffect, useContext} from "react";
import {Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import accountsActions from "../../../accounts-actions";
import Loading from "../../../../common/loading";
import {AuthContext} from "../../../../../contexts/AuthContext";
import {getFromValidationErrorToast, getPersistToast} from "../../../../common/toasts/toasts";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import Model, {DataState} from "../../../../../core/data_model/model";

function LdapIdpAccountEditorPanel({ldapOrganizationAccountData, ldapIdpAccountData, setLdapIdpAccountData }) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapIdpAccountDataDto, setLdapIdpAccountDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await unpackLdapOrganizationAccountData();
    setIsLoading(false);
  };

  const unpackLdapOrganizationAccountData = async () => {
    let ldapIdpAccountDataDto = ldapIdpAccountData;
    if (ldapIdpAccountDataDto.isNew() && ldapOrganizationAccountData != null) {
      ldapIdpAccountDataDto.setData("domain", ldapOrganizationAccountData["orgDomain"]);
      ldapIdpAccountDataDto.setData("name", ldapOrganizationAccountData["name"] + "-idp");
    }

    setLdapIdpAccountDataDto(ldapIdpAccountDataDto);
  };

  const createIdpAccount = async () => {
    console.log("Persisting new idp account to DB: " + JSON.stringify(ldapIdpAccountDataDto));

    if (ldapIdpAccountDataDto.isModelValid()) {
      let createLdapIdpAccountResponse = await accountsActions.createIdpAccount(ldapIdpAccountDataDto, getAccessToken);
      console.log("createLdapIdpAccountResponse: ", JSON.stringify(createLdapIdpAccountResponse));

      if (createLdapIdpAccountResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${ldapIdpAccountDataDto["name"]}.  Error returned: ${JSON.stringify(createLdapIdpAccountResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        let toast = getPersistToast(false, "create", "account", errorMsg, setShowToast);
        setToast(toast);
        setShowToast(true);
      } else {
        let updatedDto = new Model(createLdapIdpAccountResponse.data, ldapIdpAccountDataDto.metaData, false);
        setLdapIdpAccountData(updatedDto);
        setLdapIdpAccountDataDto(updatedDto);
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateLdapOrganizationAccount = async () => {
    if (ldapIdpAccountDataDto.isModelValid()) {
      try {
        // console.log("Persisting values in updateLdapOrganizationAccount : " + JSON.stringify(ldapOrganizationAccountDataDto.data));
        // const updateOrganizationAccountResponse = await accountsActions.updateOrganizationAccount(ldapOrganizationAccountDataDto, getAccessToken);
        // console.log("updateOrganizationAccountResponse data: " + JSON.stringify(updateOrganizationAccountResponse.data));
        // let toast = getPersistToast(true, "update", "Account", undefined, setShowToast);
        // setToast(toast);
        // setShowToast(true);
        // let updatedDto = new Model(updateOrganizationAccountResponse.data, ldapOrganizationAccountDataDto.metaData, false);
        // setLdapOrganizationAccountData(updatedDto);
        // setLdapIdpAccountDataDto(updatedDto);
      } catch (err) {
        console.log(err.message);
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };
  return (
    <>
      {isLoading ? <Loading size="sm"/> : null}

      {!isLoading && <>
        <div className="m-3">
          {showToast && toast}
          <Row>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapIdpAccountDataDto.isNew()} fieldName={"name"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"domain"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"idpRedirectURI"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"clientID"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"issuer"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"baseUrl"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"idpVendor"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"configEntryType"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"idpNameIDMapping"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto m-3 px-3">
              {ldapIdpAccountDataDto.isNew()
                ? <Button size="sm" variant="primary" onClick={() => createIdpAccount()}>Create Idp Account</Button>
                : <Button size="sm" variant="primary" disabled={ldapIdpAccountDataDto.dataState === DataState.LOADED} onClick={() => updateLdapOrganizationAccount()}>Save Changes</Button>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

LdapIdpAccountEditorPanel.propTypes = {
  ldapIdpAccountData: PropTypes.object,
  ldapOrganizationAccountData: PropTypes.object,
  setLdapIdpAccountData: PropTypes.func,
  canDelete: PropTypes.bool,
  setShowEditPanel: PropTypes.func,
  handleClose: PropTypes.func,
  handleBackButton: PropTypes.func
};

export default LdapIdpAccountEditorPanel;


