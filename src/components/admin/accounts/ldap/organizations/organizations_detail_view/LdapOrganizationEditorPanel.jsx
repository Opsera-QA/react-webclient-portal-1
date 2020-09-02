import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import accountsActions from "../../../accounts-actions";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import {capitalizeFirstLetter} from "../../../../../common/helpers/string-helpers";
import {
  getCreateFailureResultDialog,
  getCreateSuccessResultDialog,
  getFormValidationErrorDialog,
  getUpdateFailureResultDialog, getUpdateSuccessResultDialog
} from "../../../../../common/toasts/toasts";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";
import Model, {DataState} from "../../../../../../core/data_model/model";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import SaveButton from "../../../../../common/buttons/SaveButton";

function LdapOrganizationEditorPanel({ ldapOrganizationData, setLdapOrganizationData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapOrganizationDataDto, setLdapOrganizationDataDto] = useState({});
  const [ opseraUserList, setOpseraUsersList] = useState([]);
  const [ currentOpseraUser, setCurrentOpseraUser ] = useState(undefined);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadOpseraUsers();
    setLdapOrganizationDataDto(ldapOrganizationData)
    setIsLoading(false);
  };

  const loadOpseraUsers = async () => {
    const response = await accountsActions.getUsers(getAccessToken);
    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      if (ldapOrganizationData.getData("orgOwnerEmail") != null) {
        if (user["email"] === ldapOrganizationData.getData("orgOwnerEmail")) {
          setCurrentOpseraUser({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
        }
      }
      parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
    });
    setOpseraUsersList(parsedUserNames);
  };

  const createOrganization = async () => {
    if(ldapOrganizationDataDto.isModelValid()) {
      try {
        let createLdapOrganizationResponse = await accountsActions.createOrganization(ldapOrganizationDataDto, getAccessToken);
        let toast = getCreateSuccessResultDialog(ldapOrganizationDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      } catch (error) {
        let toast = getCreateFailureResultDialog(ldapOrganizationDataDto.getType(), error.message, setShowToast);
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

  const updateLdapOrganization = async () => {
    if(ldapOrganizationDataDto.isModelValid()) {
      try {
          let updateOrganizationResponse = await accountsActions.updateOrganization(ldapOrganizationDataDto, getAccessToken);
          let toast = getUpdateSuccessResultDialog( ldapOrganizationDataDto.getType(), setShowToast);
          setToast(toast);
          setShowToast(true);
          let updatedDto = new Model(updateOrganizationResponse.data, ldapOrganizationDataDto.metaData, false);
          setLdapOrganizationData(updatedDto);
        setLdapOrganizationDataDto(updatedDto);
        } catch (error) {
          let toast = getUpdateFailureResultDialog(ldapOrganizationDataDto.getType(), error.message, setShowToast);
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

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    ldapOrganizationDataDto.setData("orgOwner", option["firstName"] + " " + option["lastName"]);
    ldapOrganizationDataDto.setData("orgOwnerEmail", option["email"]);
    setLdapOrganizationDataDto({...ldapOrganizationDataDto});
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        <div className="scroll-y full-height">
          {showToast && toast}
          <Row>
            <Col lg={12}>
              <div className="p-2">
                <label className="mt-0"><span>Opsera Customer Record<span className="danger-red">*</span></span></label>
                <DropdownList
                  data={opseraUserList}
                  valueField='value'
                  textField='text'
                  filter='contains'
                  groupBy={user => capitalizeFirstLetter(user.id.organizationName, "-", "No Organization Name")}
                  defaultValue={currentOpseraUser}
                  onChange={handleOpseraUserChange}
                />
              </div>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapOrganizationDataDto.isNew()} fieldName={"name"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"description"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"orgName"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"orgOwner"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"orgOwnerEmail"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"envCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"numberOfLicenses"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"objectCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"subscription"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={ldapOrganizationDataDto} createRecord={createOrganization}
                          updateRecord={updateLdapOrganization}/>
            </div>
          </Row>
        </div>
      </>
    );
  }
}

LdapOrganizationEditorPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  setLdapOrganizationData: PropTypes.func,
  handleClose: PropTypes.func
};

export default LdapOrganizationEditorPanel;


