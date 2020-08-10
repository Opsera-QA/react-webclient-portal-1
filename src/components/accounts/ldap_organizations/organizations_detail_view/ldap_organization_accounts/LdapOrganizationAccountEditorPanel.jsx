import React, {useState, useEffect, useContext} from "react";
import {Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import {ldapOrganizationAccountFormFields} from "../../ldap-organization-account-form-fields";
import accountsActions from "../../../accounts-actions";
import TextInput from "../../../../common/input/text-input";
import Loading from "../../../../common/loading";
import {AuthContext} from "../../../../../contexts/AuthContext";
import ToggleInput from "../../../../common/input/toggle-input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import {capitalizeFirstLetter} from "../../../../common/helpers/string-helpers";
import {getFromValidationErrorToast, getPersistToast} from "../../../../common/toasts/toasts";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import Model, {DataState} from "../../../../../core/data_model/model";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";

function LdapOrganizationAccountEditorPanel({ldapOrganizationAccountData, ldapOrganization, newLdapOrganizationAccount, setLdapOrganizationAccountData, setShowEditPanel, handleClose, handleBackButton}) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapOrganizationAccountDataDto, setLdapOrganizationAccountDataDto] = useState({});
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [currentOpseraUser, setCurrentOpseraUser] = useState(undefined);
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
    let ldapOrganizationAccountDataDto = ldapOrganizationAccountData;
    if (ldapOrganizationAccountDataDto.isNew() && ldapOrganization != null) {
      let orgDomain = ldapOrganization.orgOwnerEmail.substring(ldapOrganization.orgOwnerEmail.lastIndexOf("@") + 1);
      console.log("Parsed domain: " + JSON.stringify(orgDomain));
      ldapOrganizationAccountDataDto.setData("orgDomain", orgDomain);
      ldapOrganizationAccountDataDto.setData("name", ldapOrganization["name"] + "-acc");
      ldapOrganizationAccountDataDto.setData("org", ldapOrganization["name"] != null ? ldapOrganization["name"] : "");
    }

    setLdapOrganizationAccountDataDto(ldapOrganizationAccountDataDto);
    await loadOpseraUsers(ldapOrganizationAccountDataDto);
  };


  // TODO: Pull into general helper
  const loadOpseraUsers = async (ldapOrganizationAccountDataDto) => {
    const response = await accountsActions.getUsers(getAccessToken);
    // console.log("Opsera Users: \n" + JSON.stringify(response.data));

    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      let orgDomain = user.email.substring(user.email.lastIndexOf("@") + 1);
      if (ldapOrganizationAccountData.isNew() || ldapOrganizationAccountDataDto["orgDomain"].includes(orgDomain)) {
        parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
      }
    });
    // console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
    setOpseraUsersList(parsedUserNames);
  };

  const createOrganizationAccount = async () => {
    console.log("Persisting new organization account to DB: " + JSON.stringify(ldapOrganizationAccountDataDto));

    if (ldapOrganizationAccountDataDto.isModelValid()) {
      let createLdapOrganizationAccountResponse = await accountsActions.createOrganizationAccount(ldapOrganizationAccountDataDto, getAccessToken);
      console.log("createLdapOrganizationAccountResponse: ", JSON.stringify(createLdapOrganizationAccountResponse));

      if (createLdapOrganizationAccountResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${ldapOrganizationAccountDataDto["accountName"]}.  Error returned: ${JSON.stringify(createLdapOrganizationAccountResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        let toast = getPersistToast(false, "create", "account", errorMsg, setShowToast);
        setToast(toast);
        setShowToast(true);
      } else {
        handleClose();
      }
    }
    else {
      let toast = getFromValidationErrorToast(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateLdapOrganizationAccount = async () => {
    if (ldapOrganizationAccountDataDto.isModelValid()) {
      try {
        console.log("Persisting values in updateLdapOrganizationAccount : " + JSON.stringify(ldapOrganizationAccountDataDto.data));
        const updateOrganizationAccountResponse = await accountsActions.updateOrganizationAccount(ldapOrganizationAccountDataDto, getAccessToken);
        console.log("updateOrganizationAccountResponse data: " + JSON.stringify(updateOrganizationAccountResponse.data));
        let toast = getPersistToast(true, "update", "Account", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(updateOrganizationAccountResponse.data, ldapOrganizationAccountDataDto.metaData, false);
        setLdapOrganizationAccountData(updatedDto);
        setLdapOrganizationAccountDataDto(updatedDto);
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

  const addAdmin = (user) => {
    console.log("USER: " + JSON.stringify(user));
    let newAdmin = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.email,
      departmentName: user.organizationName,
      preferredName: "",
      division: "",
      teams: ["team1"],
      title: "",
      site: "Site1"
    };

    ldapOrganizationAccountDataDto.setData("administrator", {...newAdmin});
    setLdapOrganizationAccountDataDto({...ldapOrganizationAccountDataDto});
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    console.log("Setting opsera account to: " + JSON.stringify(selectedOption));
    console.log("option.organizationName: " + option["organizationName"]);
    ldapOrganizationAccountDataDto.setData("orgOwner", option["firstName"] + " " + option["lastName"]);
    ldapOrganizationAccountDataDto.setData("orgOwnerEmail", option["email"]);
    setLdapOrganizationAccountDataDto({...ldapOrganizationAccountDataDto});
    addAdmin(option);
  };

  return (
    <>
      {isLoading ? <Loading size="sm"/> : null}

      {!isLoading && <>

        <div className="scroll-y full-height">
          {!newLdapOrganizationAccount &&
          <div className="mb-2 text-muted">
            {/*TODO: Implement overlay*/}
            {/*<OverlayTrigger*/}
            {/*  placement="top"*/}
            {/*  delay={{ show: 250, hide: 400 }}*/}
            {/*  // overlay={renderTooltip({ message: "Edit this account" })}*/}
            {/*>*/}
            <FontAwesomeIcon icon={faCogs} className="pointer float-right ml-3" onClick={() => {
              setShowEditPanel(false);
            }}/>
            {/*</OverlayTrigger>*/}
          </div>
          }

          <div className="pt-1">
            <hr/>
          </div>
          {showToast && toast}
          <Row>
            <Col>
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
          </Row>
          <Row>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapOrganizationAccountDataDto.isNew()} fieldName={"orgOwner"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"orgOwnerEmail"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapOrganizationAccountDataDto.isNew()} fieldName={"orgDomain"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"name"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"accountName"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"description"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"configEntryType"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"entityID"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"idpPostURL"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"idpVendor"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            {/*<Col>*/}
            {/*  <ItemInput field={fields.idpReturnAttributes} setData={setFormField}*/}
            {/*             formData={formData}/>*/}
            {/*</Col>*/}
            <Col lg={12}>
              <DtoToggleInput disabled={true} fieldName={"isMultipleIDP"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoToggleInput disabled={true} fieldName={"localAuth"} dataObject={ldapOrganizationAccountDataDto}
                           setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoToggleInput disabled={true} fieldName={"samlEnabled"} dataObject={ldapOrganizationAccountDataDto}
                           setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoToggleInput disabled={true} fieldName={"oAuthEnabled"} dataObject={ldapOrganizationAccountDataDto}
                           setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
              {ldapOrganizationAccountDataDto.isNew()
                ? <Button size="sm" variant="primary" onClick={() => createOrganizationAccount()}>Create Account</Button>
                :
                <>
                  <Button size="sm" className="mr-2" variant="secondary" onClick={() => handleBackButton()}>Back to Accounts</Button>
                  <Button size="sm" variant="primary" disabled={ldapOrganizationAccountDataDto.dataState === DataState.LOADED}
                          onClick={() => updateLdapOrganizationAccount()}>Save Changes</Button>
                </>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

LdapOrganizationAccountEditorPanel.propTypes = {
  ldapOrganization: PropTypes.object,
  ldapOrganizationAccountData: PropTypes.object,
  setLdapOrganizationAccountData: PropTypes.func,
  canDelete: PropTypes.bool,
  newLdapOrganizationAccount: PropTypes.bool,
  setShowEditPanel: PropTypes.func,
  handleClose: PropTypes.func,
  handleBackButton: PropTypes.func
};

LdapOrganizationAccountEditorPanel.defaultProps = {
  newLdapOrganizationAccount: false,
};

export default LdapOrganizationAccountEditorPanel;


