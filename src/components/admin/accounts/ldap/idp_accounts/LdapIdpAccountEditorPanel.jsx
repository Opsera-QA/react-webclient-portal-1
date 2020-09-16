import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import accountsActions from "../../accounts-actions";
import {AuthContext} from "../../../../../contexts/AuthContext";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import Model from "../../../../../core/data_model/model";
import TooltipWrapper from "../../../../common/tooltip/tooltipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import LoadingDialog from "../../../../common/status_notifications/loading";
import SaveButton from "../../../../common/buttons/SaveButton";
import WarningDialog from "../../../../common/status_notifications/WarningDialog";
import ToastContext from "react-bootstrap/cjs/ToastContext";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";

function LdapIdpAccountEditorPanel({ldapOrganizationAccountData, ldapIdpAccountData, setLdapIdpAccountData, setShowIdpEditPanel, authorizedActions }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(ToastContext);
  const [ldapIdpAccountDataDto, setLdapIdpAccountDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showWarningMessage, setShowWarningMessage] = useState(true);

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
    if (ldapOrganizationAccountData != null) {
      ldapIdpAccountDataDto.setData("domain", ldapOrganizationAccountData["orgDomain"]);

      if (ldapIdpAccountDataDto.isNew())
      {
        ldapIdpAccountDataDto.setData("name", ldapOrganizationAccountData["name"] + "-idp");
      }
    }

    setLdapIdpAccountDataDto(ldapIdpAccountDataDto);
  };

  const createIdpAccount = async () => {
    if (ldapIdpAccountDataDto.isModelValid()) {
      try {
        let createLdapIdpAccountResponse = await accountsActions.createIdpAccount(ldapIdpAccountDataDto, getAccessToken);
        toastContext.showCreateSuccessResultDialog(ldapIdpAccountDataDto.getType());
        let updatedDto = new Model(createLdapIdpAccountResponse.data, ldapIdpAccountDataDto.metaData, false);
        setLdapIdpAccountData(updatedDto);
        setLdapIdpAccountDataDto(updatedDto);
      } catch (error) {
        toastContext.showCreateFailureResultDialog(ldapIdpAccountDataDto.getType(), error.message);
        console.error(error.message);
      }
    }
    else {
      toastContext.showFormValidationErrorDialog();
    }
  };

  const updateLdapIdpAccount = async () => {
    if (ldapIdpAccountDataDto.isModelValid()) {
      try {
        const updateIdpAccountResponse = await accountsActions.updateIdpAccount(ldapIdpAccountDataDto, ldapOrganizationAccountData, getAccessToken);
        toastContext.showUpdateSuccessResultDialog(ldapIdpAccountDataDto.getType());
        let updatedDto = new Model(updateIdpAccountResponse.data, ldapIdpAccountDataDto.metaData, false);
        setLdapIdpAccountDataDto(updatedDto);
        setLdapIdpAccountData(updatedDto);
      } catch (error) {
        toastContext.showUpdateFailureResultDialog(ldapIdpAccountDataDto.getType(), error.message);
        console.error(error.message);
      }
    }
    else {
      toastContext.showFormValidationErrorDialog();
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("update_idp_account")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this IDP Account"} />;
  }

  return (
    <>
        <div className="m-3">
          {ldapIdpAccountDataDto.isNew() && showWarningMessage && <WarningDialog setWarningMessage={setShowWarningMessage} autoCloseDialog={false} warningMessage="IDP Account Creation is not currently available" />}
          {!ldapIdpAccountDataDto.isNew() && <div className="mb-2 text-muted">
            <TooltipWrapper innerText={"Edit this Account"}>
              <FontAwesomeIcon icon={faCogs} className="pointer float-right ml-3" onClick={() => {
                setShowIdpEditPanel(false);
              }}/>
            </TooltipWrapper>
          </div>}
          <Row>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapIdpAccountDataDto.isNew()} fieldName={"name"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"domain"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"idpRedirectURI"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"clientID"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"issuer"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"baseUrl"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"idpVendor"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"configEntryType"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"idpNameIDMapping"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto m-3 px-3">
              <SaveButton disable={ldapIdpAccountDataDto.isNew()} recordDto={ldapIdpAccountDataDto} createRecord={createIdpAccount} updateRecord={updateLdapIdpAccount} />
            </div>
          </Row>
        </div>
    </>
  );
}

LdapIdpAccountEditorPanel.propTypes = {
  ldapIdpAccountData: PropTypes.object,
  ldapOrganizationAccountData: PropTypes.object,
  setLdapIdpAccountData: PropTypes.func,
  canDelete: PropTypes.bool,
  setShowEditPanel: PropTypes.func,
  handleBackButton: PropTypes.func,
  setShowIdpEditPanel: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapIdpAccountEditorPanel;


