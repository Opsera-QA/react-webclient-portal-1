import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "../../../common/loading";
import accountsActions from "../../accounts-actions";
import {getFromValidationErrorToast, getPersistToast} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import Model, {DataState} from "../../../../core/data_model/model";

function LdapUserEditorPanel({ ldapUserData, orgDomain, setLdapUserData, handleClose, showButton }) {
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
    console.log("Persisting new user to DB: " + JSON.stringify(ldapUserDataDto.data));

    if (ldapUserDataDto.isModelValid()) {
      let createUserResponse = await accountsActions.createUser(ldapUserDataDto, getAccessToken);

      if (createUserResponse.error != null) {
        const errorMsg = `Microservice error reported creating the user: ${ldapUserDataDto["name"]}.  Error returned: ${JSON.stringify(createUserResponse.error.message, null, 2)}`;
        console.error(errorMsg);
        let toast = getPersistToast(false, "create", "user", errorMsg, setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      else {
        handleClose();
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateLdapUser = async () => {
    if(ldapUserDataDto.isModelValid()) {
      try {
        const response = await accountsActions.updateUser(orgDomain, ldapUserDataDto, getAccessToken);
        // console.log("Response data: " + JSON.stringify(response));
        let updatedDto = new Model(response.data, ldapUserDataDto.metaData, false);
        setLdapUserDataDto(updatedDto);
        setLdapUserData(updatedDto);
        let toast = getPersistToast(true, "update", "User", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }

  };

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {showToast && toast}
          <Row>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapUserDataDto.isNew()} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"name"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"firstName"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"lastName"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"preferredName"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapUserDataDto.isNew()} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"emailAddress"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"division"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"teams"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"departmentName"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"title"} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"site"} />
            </Col>
          </Row>
          <Row>
            { showButton &&
              <div className="ml-auto px-3">
                {ldapUserDataDto.isNew() ? <Button size="sm" variant="primary" disabled={false} onClick={() => createLdapUser()}>Create LDAP User</Button>
                  : <Button size="sm" variant="primary" disabled={ldapUserDataDto.dataState === DataState.LOADED} onClick={() => updateLdapUser()}>Save changes</Button>
                }
              </div>
            }
          </Row>
        </div>
      </>}
    </>
  );
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


