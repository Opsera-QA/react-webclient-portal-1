import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import accountsActions from "../../accounts-actions";
import Loading from "../../../common/loading";
import { AuthContext } from "../../../../contexts/AuthContext";
import {capitalizeFirstLetter} from "../../../common/helpers/string-helpers";
import {getFromValidationErrorToast, getPersistToast} from "../../../common/toasts/toasts";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import Model, {DataState} from "../../../../core/data_model/model";

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
    // console.log("Opsera Users: \n" + JSON.stringify(Object.keys(response.data)));

    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
    });
    // console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
    setOpseraUsersList(parsedUserNames);
  };

  const createOrganization = async (newLdapOrganizationData) => {
    console.log("Persisting new organization to DB: " + JSON.stringify(ldapOrganizationDataDto));

    if(ldapOrganizationDataDto.isModelValid()) {
      let createLdapOrganizationResponse = await accountsActions.createOrganization(ldapOrganizationDataDto, getAccessToken);
      console.log("createLdapResponse: ", JSON.stringify(createLdapOrganizationResponse));

      if (createLdapOrganizationResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${newLdapOrganizationData.accountName}.  Error returned: ${JSON.stringify(createLdapOrganizationResponse.error.message, null, 2)}`;
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

  const updateLdapOrganization = async () => {
    if(ldapOrganizationDataDto.isModelValid()) {
      try {
        let updateOrganizationResponse = await accountsActions.updateOrganization(ldapOrganizationDataDto, getAccessToken);
        console.log("Response data: " + JSON.stringify(updateOrganizationResponse.data));
        // setLdapOrganizationData({ldapOrganizationData, ...response.data });
        let toast = getPersistToast(true, "update", "Organization", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(updateOrganizationResponse.data, ldapOrganizationDataDto.metaData, false);
        setLdapOrganizationData(updatedDto);
        setLdapOrganizationDataDto(updatedDto);
      }
      catch (err) {
        console.log(err.message);
        let toast = getFromValidationErrorToast("", setShowToast);
        setToast(toast);
        setShowToast(true);
      }
    }
    else {
      // TODO: Wire errors up
      let toast = getFromValidationErrorToast("", setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    console.log("Setting opsera account to: " + JSON.stringify(selectedOption));
    console.log("option.organizationName: " + option["organizationName"]);
    ldapOrganizationDataDto.setData("orgOwner", option["firstName"] + " " + option["lastName"]);
    ldapOrganizationDataDto.setData("orgOwnerEmail", option["email"]);
    setLdapOrganizationDataDto({...ldapOrganizationDataDto});
  };

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {showToast && toast}
          <Row>
            <Col lg={12}>
              <div className="custom-select-input">
                <label className="mt-0"><span>Opsera Customer Record<span className="danger-red">*</span></span></label>
                <DropdownList
                  data={opseraUserList}
                  valueField='value'
                  textField='text'
                  filter='contains'
                  groupBy={user => capitalizeFirstLetter(user.id.organizationName, "-", "No Organization Name")}
                  defaultValue={undefined}
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
              {/*<ItemInput disabled={true} field={ fields.subscription } setData={setFormField} formData={formData}/>*/}
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
              {ldapOrganizationDataDto.isNew() ? <Button size="sm" variant="primary" onClick={() => createOrganization(ldapOrganizationData)}>Create Organization</Button>
                : <Button size="sm" variant="primary" disabled={ldapOrganizationDataDto.dataState === DataState.LOADED} onClick={() => updateLdapOrganization()}>Save Changes</Button>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

LdapOrganizationEditorPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  setLdapOrganizationData: PropTypes.func,
  handleClose: PropTypes.func
};

export default LdapOrganizationEditorPanel;


