import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import accountsActions from "../../../admin/accounts/accounts-actions";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import Model from "../../../../core/data_model/model";
import LoadingDialog from "../../../common/status_notifications/loading";
import SaveButton from "../../../common/buttons/SaveButton";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import WarningDialog from "../../../common/status_notifications/WarningDialog";

function LdapUserEditorPanel({ ldapUserData, orgDomain, setLdapUserData, authorizedActions, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapUserDataDto, setLdapUserDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapUserDataDto(ldapUserData);
    setIsLoading(false);
  };

  const createLdapUser = async () => {
    if (ldapUserDataDto.isModelValid()) {

      try {
        let createUserResponse = await accountsActions.createUser(ldapUserDataDto, getAccessToken);
        handleClose();
        toastContext.showCreateSuccessResultDialog(ldapUserDataDto.getType());
      } catch (error) {
        toastContext.showCreateFailureResultDialog(ldapUserDataDto.getType(), error.message);
        console.error(error.message);
      }
    }
    else {
      toastContext.showFormValidationErrorDialog();
    }
  };

  const updateLdapUser = async () => {
    if(ldapUserDataDto.isModelValid()) {
      try {
        const response = await accountsActions.updateUser(orgDomain, ldapUserDataDto, getAccessToken);
        let updatedDto = new Model(response.data, ldapUserDataDto.metaData, false);
        setLdapUserDataDto(updatedDto);
        setLdapUserData(updatedDto);
        toastContext.showUpdateSuccessResultDialog( ldapUserDataDto.getType());
      } catch (error) {
        toastContext.showUpdateFailureResultDialog(ldapUserDataDto.getType(), error.message);
        console.error(error.message);
      }
    }

  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("update_user")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this user"} />;
  }

    return (
      <>
        <div className="scroll-y full-height">
          <Row>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapUserDataDto.isNew()} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"name"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"firstName"}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"lastName"}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"preferredName"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapUserDataDto.isNew()} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"emailAddress"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"division"}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"teams"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"departmentName"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"title"}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"site"}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={ldapUserDataDto} createRecord={createLdapUser} updateRecord={updateLdapUser} />
            </div>
          </Row>
        </div>
      </>
    );
}

LdapUserEditorPanel.propTypes = {
  showButton: PropTypes.bool,
  orgDomain: PropTypes.string,
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

LdapUserEditorPanel.defaultProps = {
  showButton: true,
  newLdapUser: false
};

export default LdapUserEditorPanel;


