import React, {useEffect, useState, useContext} from "react";
import {Button, Form, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/accounts/accounts-actions.js";
import Row from "react-bootstrap/Row";
import {
  getFromValidationErrorToast,
  getPersistToast,
} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import Model, {DataState} from "../../../../core/data_model/model";
import LoadingDialog from "../../../common/loading";

function LdapGroupEditorPanel({ldapGroupData, currentUserEmail, ldapOrganizationData, setLdapGroupData, handleClose}) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapGroupDataDto, setLdapGroupDataDto] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const groupTypeOptions = [{value: "project", text: "project"},{value: "tag", text: "tag"},{value: "user", text: "user"}];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapGroupDataDto(ldapGroupData);
    setIsLoading(false)
  };

  const createGroup = async () => {
    if (ldapGroupDataDto.isModelValid()) {
      const response = await accountsActions.createGroup(ldapOrganizationData, ldapGroupDataDto, currentUserEmail, getAccessToken);
      handleClose();
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateGroup = async () => {
    if (ldapGroupDataDto.isModelValid()) {
      // console.log("Payload: " + JSON.stringify(payload));
      const response = await accountsActions.updateGroup(ldapOrganizationData, ldapGroupDataDto, getAccessToken);
      // console.log("Response: " + JSON.stringify(response.data));
      let toast = getPersistToast(true, "update", "Group member", undefined, setShowToast);
      let updatedDto = new Model(response.data, ldapGroupDataDto.metaData, false);
      setLdapGroupData(updatedDto);
      setLdapGroupDataDto(updatedDto);
      setToast(toast);
      setShowToast(true);
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  if (isLoading) {
    return (<LoadingDialog/>);
  } else {
    return (
      <>
        <div className="p-3">
          <>
            {showToast && toast}
            <Row>
              <Col lg={12}>
                <DtoTextInput disabled={!ldapGroupDataDto.isNew()} fieldName={"name"} dataObject={ldapGroupDataDto}
                              setDataObject={setLdapGroupDataDto}/>
              </Col>
              <Col lg={12}>
                {ldapGroupDataDto.isNew()
                  ? <DtoSelectInput fieldName={"groupType"} setDataObject={setLdapGroupDataDto}
                                    dataObject={ldapGroupDataDto} selectOptions={groupTypeOptions}/>
                  : <DtoTextInput disabled={true} fieldName={"groupType"} setData={setLdapGroupDataDto}
                                  dataObject={ldapGroupDataDto}/>}
              </Col>
              <Col lg={12}>
                <DtoTextInput disabled={ldapGroupDataDto.getData("groupType") !== "project"}
                              fieldName={"externalSyncGroup"} dataObject={ldapGroupDataDto}
                              setDataObject={setLdapGroupDataDto}/>
              </Col>
              <Col lg={12}>
                <DtoToggleInput disabled={ldapGroupDataDto.groupType === "role"} fieldName={"isSync"}
                                dataObject={ldapGroupDataDto} setDataObject={setLdapGroupDataDto}/>
              </Col>
            </Row>
            <Row>
              <div className="ml-auto px-3">
                {ldapGroupDataDto.isNew() ? <Button size="sm" variant="primary" onClick={() => createGroup()}>Create Group</Button>
                  : <Button size="sm" variant="primary" disabled={ldapGroupDataDto.dataState === DataState.LOADED}
                            onClick={() => updateGroup()}>Save Changes</Button>
                }
              </div>
            </Row>
          </>
        </div>
      </>
    );
  }
}

LdapGroupEditorPanel.propTypes = {
  currentUserEmail: PropTypes.string,
  setLdapGroupData: PropTypes.func,
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  handleClose: PropTypes.func
};

export default LdapGroupEditorPanel;


