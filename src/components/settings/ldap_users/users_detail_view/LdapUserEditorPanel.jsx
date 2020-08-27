import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import accountsActions from "../../../admin/accounts/accounts-actions";
import {
  getCreateFailureResultDialog,
  getCreateSuccessResultDialog,
  getFormValidationErrorDialog,
  getUpdateFailureResultDialog, getUpdateSuccessResultDialog
} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import Model from "../../../../core/data_model/model";
import LoadingDialog from "../../../common/status_notifications/loading";
import SaveButton from "../../../common/buttons/SaveButton";

function LdapUserEditorPanel({ ldapUserData, orgDomain, setLdapUserData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);
  const [ldapUserDataDto, setLdapUserDataDto] = useState({});
  const [toast, setToast] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        let toast = getCreateSuccessResultDialog(ldapUserDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      } catch (error) {
        let toast = getCreateFailureResultDialog(ldapUserDataDto.getType(), error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateLdapUser = async () => {
    if(ldapUserDataDto.isModelValid()) {
      try {
        const response = await accountsActions.updateUser(orgDomain, ldapUserDataDto, getAccessToken);
        let updatedDto = new Model(response.data, ldapUserDataDto.metaData, false);
        setLdapUserDataDto(updatedDto);
        setLdapUserData(updatedDto);
        let toast = getUpdateSuccessResultDialog( ldapUserDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      } catch (error) {
        let toast = getUpdateFailureResultDialog(ldapUserDataDto.getType(), error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }

  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        {showToast && toast}
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
}

LdapUserEditorPanel.propTypes = {
  showButton: PropTypes.bool,
  orgDomain: PropTypes.string,
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  handleClose: PropTypes.func
};

LdapUserEditorPanel.defaultProps = {
  showButton: true,
  newLdapUser: false
};

export default LdapUserEditorPanel;


