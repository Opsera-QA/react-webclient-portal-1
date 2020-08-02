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
import ItemInput from "../../../../common/input/item-input";
import ToggleInput from "../../../../common/input/toggle-input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import {capitalizeFirstLetter} from "../../../../common/helpers/string-helpers";

const INITIAL_ORGANIZATION_ACCOUNT_DATA = {
  name: "",
  localAuth: true,
  samlEnabled: true,
  oAuthEnabled: true,
  idpPostURL: "https://testurl.com",
  idpVendor: "OKTA",
  configEntryType: "Not sure",
  entityID: "https://dev-842100.oktapreview.com",
  description: "",
  isMultipleIDP: false,
  idpReturnAttributes: [
    "mail",
    "cn"],
  accountName: "",
  orgDomain: "",
  orgOwner: "",
  orgOwnerEmail: "",
  administrator: {}
};

function LdapOrganizationAccountEditorPanel({ldapOrganizationAccountData, ldapOrganization, newLdapOrganizationAccount, setLdapOrganizationAccountData, setShowEditPanel, handleClose, handleBackButton}) {
  const fields = ldapOrganizationAccountFormFields;
  const [error, setErrors] = useState("");
  const {getAccessToken} = useContext(AuthContext);
  const [changeMap, setChangeMap] = useState({});
  const [formData, setFormData] = useState(INITIAL_ORGANIZATION_ACCOUNT_DATA);
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [currentOpseraUser, setCurrentOpseraUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData(ldapOrganizationAccountData);
  }, []);

  const loadData = async (ldapOrganizationAccountData) => {
    setIsLoading(true);
    await unpackLdapOrganizationAccountData(ldapOrganizationAccountData);
    await loadOpseraUsers();
    setIsLoading(false);
  };

  const unpackLdapOrganizationAccountData = async (ldapOrganizationAccountData) => {
    console.log("ldapOrganizationAccountData in unpackLdapUserData: " + JSON.stringify(ldapOrganizationAccountData));
    if (ldapOrganizationAccountData != null) {
      setFormField("org", ldapOrganizationAccountData["org"] != null ? ldapOrganizationAccountData["org"] : "");
      setFormField("name", ldapOrganizationAccountData["name"] != null ? ldapOrganizationAccountData["name"] : "");
      setFormField("localAuth", ldapOrganizationAccountData["localAuth"] != null ? ldapOrganizationAccountData["localAuth"] : "");
      setFormField("samlEnabled", ldapOrganizationAccountData["samlEnabled"] != null ? ldapOrganizationAccountData["samlEnabled"] : "");
      setFormField("oAuthEnabled", ldapOrganizationAccountData["oAuthEnabled"] != null ? ldapOrganizationAccountData["oAuthEnabled"] : "");
      setFormField("idpPostURL", ldapOrganizationAccountData["idpPostURL"] != null ? ldapOrganizationAccountData["idpPostURL"] : "");
      setFormField("idpVendor", ldapOrganizationAccountData["idpVendor"] != null ? ldapOrganizationAccountData["idpVendor"] : "");
      setFormField("configEntryType", ldapOrganizationAccountData["configEntryType"] != null ? ldapOrganizationAccountData["configEntryType"] : "");
      setFormField("entityID", ldapOrganizationAccountData["entityID"] != null ? ldapOrganizationAccountData["entityID"] : "");
      setFormField("orgOwnerEmail", ldapOrganizationAccountData["orgOwnerEmail"] != null ? ldapOrganizationAccountData["orgOwnerEmail"] : "");
      setFormField("description", ldapOrganizationAccountData["description"] != null ? ldapOrganizationAccountData["description"] : "");
      setFormField("isMultipleIDP", ldapOrganizationAccountData["isMultipleIDP"] != null ? ldapOrganizationAccountData["isMultipleIDP"] : "");
      setFormField("idpReturnAttributes", ldapOrganizationAccountData["idpReturnAttributes"] != null ? ldapOrganizationAccountData["idpReturnAttributes"] : "");
      setFormField("accountName", ldapOrganizationAccountData["accountName"] != null ? ldapOrganizationAccountData["accountName"] : "");
      setFormField("orgDomain", ldapOrganizationAccountData["orgDomain"] != null ? ldapOrganizationAccountData["orgDomain"] : "");
      setFormField("administrator", ldapOrganizationAccountData["administrator"] != null ? ldapOrganizationAccountData["administrator"] : "");
    }

    if (newLdapOrganizationAccount && ldapOrganization != null) {
      let orgDomain = ldapOrganization.orgOwnerEmail.substring(ldapOrganization.orgOwnerEmail.lastIndexOf("@") + 1);
      console.log("Parsed domain: " + JSON.stringify(orgDomain));
      setFormField("orgDomain", orgDomain);
      setFormField("name", ldapOrganization["name"] + "-acc");
      setFormField("org", ldapOrganization["name"] != null ? ldapOrganization["name"] : "");
    }

    setIsLoading(false);
  };


  const loadOpseraUsers = async () => {
    const response = await accountsActions.getUsers(getAccessToken);
    console.log("Opsera Users: \n" + JSON.stringify(response.data));

    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      let orgDomain = user.email.substring(user.email.lastIndexOf("@") + 1);
      if (ldapOrganizationAccountData["orgDomain"].includes(orgDomain)) {
        parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
      }
    });
    console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
    setOpseraUsersList(parsedUserNames);
  };

  const setFormField = (field, value) => {
    console.log("Setting form field: " + field + " value: " + JSON.stringify(value));

    if (value === ldapOrganizationAccountData[field]) {
      console.log("Removing " + field + " from change map");
      delete changeMap[field];
    } else {
      console.log("Added " + field + " to change map: " + value);
      changeMap[field] = value;
      setChangeMap({...changeMap});
    }

    formData[field] = value;
    setFormData({...formData});


    console.log("ChangeMap: " + JSON.stringify(changeMap));

    if (newLdapOrganizationAccount) {
      ldapOrganizationAccountData[field] = value;
      setLdapOrganizationAccountData({...ldapOrganizationAccountData});
    }
  };

  //TODO: Check fields
  const isFormValid = true;

  const createOrganizationAccount = async (newLdapOrganizationData) => {
    let ldapOrganizationAccount = {orgAccount: newLdapOrganizationData};
    console.log("Persisting new organization account to DB: " + JSON.stringify(ldapOrganizationAccount));

    if (isFormValid) {
      let createLdapOrganizationAccountResponse = await accountsActions.create(ldapOrganizationAccount, getAccessToken);
      console.log("createLdapResponse: ", JSON.stringify(createLdapOrganizationAccountResponse));

      if (createLdapOrganizationAccountResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${newLdapOrganizationData.accountName}.  Error returned: ${JSON.stringify(createLdapOrganizationAccountResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        setErrors(errorMsg);
      } else {
        handleClose();
      }
    }
  };

  const updateLdapOrganizationAccount = async () => {
    if (isFormValid) {
      try {
        let organizationUpdate = {orgDomain: formData.orgDomain, ...changeMap};
        console.log("Persisting values in organizationUpdate : " + JSON.stringify(organizationUpdate));
        const response = await accountsActions.updateOrganizationAccount(organizationUpdate, getAccessToken);
        console.log("Response data: " + JSON.stringify(response.data));
        setLdapOrganizationAccountData(response.data);
        setChangeMap({});
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const addAdmin = (user) => {
    console.log("USER: " +JSON.stringify(user));
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

    setFormField("administrator", {...newAdmin});
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    console.log("Setting opsera account to: " + JSON.stringify(selectedOption));
    console.log("option.organizationName: " + option["organizationName"]);
    setFormField("orgOwner", option["firstName"] + " " + option["lastName"]);
    setFormField("orgOwnerEmail", option["email"]);
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
          {error.length > 0 && <>
            <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
          </>}
          <Row>
            <Col>
              <div className="custom-select-input">
                <label className="mt-0"><span>{fields["opseraId"].label}{fields["opseraId"].rules.isRequired ?
                  <span className="danger-red">*</span> : null} </span></label>
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
              <TextInput disabled={true} field={fields.orgOwner} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={fields.orgOwnerEmail} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={!newLdapOrganizationAccount} field={fields.orgDomain} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={fields.name} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={fields.accountName} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={fields.description} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={fields.configEntryType} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={fields.entityID} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={fields.idpPostURL} setData={setFormField}
                         formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={fields.idpVendor} setData={setFormField}
                         formData={formData}/>
            </Col>
            {/*<Col>*/}
            {/*  <ItemInput field={fields.idpReturnAttributes} setData={setFormField}*/}
            {/*             formData={formData}/>*/}
            {/*</Col>*/}
            <Col lg={12}>
              <ToggleInput disabled={true} field={fields.isMultipleIDP} setData={setFormField}
                           formData={formData}/>
            </Col>
            <Col lg={12}>
              <ToggleInput disabled={true} field={fields.localAuth} setData={setFormField}
                           formData={formData}/>
            </Col>
            <Col lg={12}>
              <ToggleInput disabled={true} field={fields.samlEnabled} setData={setFormField}
                           formData={formData}/>
            </Col>
            <Col lg={12}>
              <ToggleInput disabled={true} field={fields.oAuthEnabled} setData={setFormField}
                           formData={formData}/>
            </Col>
          </Row>
            <Row>
              <div className="ml-auto px-3">
                {newLdapOrganizationAccount ? <Button size="sm" variant="primary"
                                                      onClick={() => createOrganizationAccount(ldapOrganizationAccountData)}>Create
                    Account</Button>
                  : <>
                    <Button size="sm" className="mr-2" variant="secondary" onClick={() => handleBackButton()}>Back to
                      Accounts</Button>
                    <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0}
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


