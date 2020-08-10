import React, {useState, useEffect, useContext} from "react";
import {Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {AuthContext} from "../../../contexts/AuthContext";
import accountsActions from "../accounts-actions";
import TextInput from "../../common/input/text-input";
import Loading from "../../common/loading";
import {
  ldapCustomerOnboardFormFields,
} from "./ldap-customer-onboard-form-fields";
import ToggleInput from "../../common/input/toggle-input";
import DropdownList from "react-widgets/lib/DropdownList";
import ItemInput from "../../common/input/item-input";
import UserInput from "./user-input";
import ldapUsersMetadata from "../ldap_users/ldap-users-metadata";
import ldapOrganizationsFormFields from "../ldap_organizations/ldap-organizations-form-fields";
import {ldapCustomerIdpAccountsFormFields} from "./ldap-idp-account-form-fields";
import {ldapOrganizationAccountFormFields} from "../ldap_organizations/ldap-organization-account-form-fields";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {capitalizeFirstLetter} from "../../common/helpers/string-helpers";

const INITIAL_ORGANIZATION_DATA = {
  name: "",
  description: "",
  envCount: "5",
  numberOfLicenses: "2000",
  objectCount: "50000",
  orgName: "",
  orgOwner: "",
  orgOwnerEmail: "",
  subscription: ["apps", "eventHooks"]
};

const INITIAL_ORGANIZATION_ACCOUNT_DATA = {
  org: "",
  name: "",
  localAuth: false,
  samlEnabled: false,
  oAuthEnabled: false,
  idpPostURL: "",
  idpVendor: "",
  configEntryType: "",
  entityID: "",
  description: "",
  isMultipleIDP: false,
  idpReturnAttributes: [],
  accountName: "",
  orgDomain: "",
  administrator: {}
};

const INITIAL_IDP_ACCOUNT_DATA = {
  name: "",
  domain: "",
  idpRedirectURI: "",
  clientID: "",
  issuer: "",
  baseUrl: "",
  idpVendor: "",
  configEntryType: "",
  idpNameIDMapping: ""
};

const INITIAL_USERS_DATA = {
  users: []
};


function LdapCustomerOnboardEditorPanel({ldapUserData, newLdapUser, setLdapUserData, handleClose}) {
  const [error, setErrors] = useState("");
  const {getAccessToken} = useContext(AuthContext);
  const [miscFields, setMiscFields] = useState({...ldapCustomerOnboardFormFields});
  const [orgFields, setOrgFields] = useState({...ldapOrganizationsFormFields});
  const [orgAccountFields, setOrgAccountFields] = useState({...ldapOrganizationAccountFormFields});
  const [idpFields, setIdpFields] = useState({...ldapCustomerIdpAccountsFormFields});
  // TODO: Implement changemap if we will be editing but for now don't
  // const [changeMap, setChangeMap] = useState({});
  const [organizationFormData, setOrganizationFormData] = useState(INITIAL_ORGANIZATION_DATA);
  const [organizationAccountFormData, setOrganizationAccountFormData] = useState(INITIAL_ORGANIZATION_ACCOUNT_DATA);
  const [idpAccountFormData, setIdpAccountFormData] = useState(INITIAL_IDP_ACCOUNT_DATA);
  const [usersFormData, setUsersFormData] = useState(INITIAL_USERS_DATA);
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [currentOpseraUser, setCurrentOpseraUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    loadData(ldapUserData);
  }, []);

  const loadData = async (ldapUserData) => {
    setIsLoading(true);
    await loadOpseraUsers();
    // await unpackLdapUserData(ldapUserData);
    setIsLoading(false);
  };

  // TODO: Implement if we use this for updates
  const unpackLdapUserData = async (ldapUserData) => {
    console.log("ldapUserData in unpackLdapUserData: " + JSON.stringify(ldapUserData));
    // if (ldapUserData != null) {
    //   setFormField("key", ldapUserData["key"] != null ? ldapUserData["key"] : "");
    //   setFormField("value", ldapUserData["value"] != null ? ldapUserData["value"] : "");
    //   setFormField("configuration", ldapUserData["configuration"] != null ? ldapUserData["configuration"] : {});
    //   setFormField("active", ldapUserData["active"] != null ? ldapUserData["active"] : false);
    // }
    // setIsLoading(false);
  };


  const loadOpseraUsers = async () => {
    const response = await accountsActions.getUsers(getAccessToken);
    // console.log("Opsera Users: \n" + JSON.stringify(response.data));

    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
    });
    console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
    setOpseraUsersList(parsedUserNames);
  };

  const setOrganizationFormField = (field, value) => {
    console.log("Setting organization form field: " + field + " value: " + JSON.stringify(value));
    organizationFormData[field] = value;
    setOrganizationFormData({...organizationFormData});
  };

  const setOrganizationAccountFormField = (field, value) => {
    console.log("Setting organization account form field: " + field + " value: " + JSON.stringify(value));
    organizationAccountFormData[field] = value;
    setOrganizationAccountFormData({...organizationAccountFormData});
  };

  const setUsersFormField = (field, value) => {
    console.log("Setting users: " + field + " value: " + JSON.stringify(value));
    setUsersFormData[field] = value;
    setUsersFormData({...usersFormData});
  };

  const setIdpAccountFormField = (field, value) => {
    console.log("Setting Idp Account form field: " + field + " value: " + JSON.stringify(value));
    idpAccountFormData[field] = value;
    setIdpAccountFormData({...idpAccountFormData});
  };

  const addAdmin = (user) => {
    // let currentUsers = formData["users"];
    //
    let newAdmin = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      departmentName: user.organizationName,
      administrator: true,
      preferredName: "",
      division: "",
      teams: [],
      title: "",
      site: ""
    };
    //
    // if (currentUsers[0] != null && currentUsers[0].administrator === true) {
    //   currentUsers[0] = newUser;
    // } else {
    //   currentUsers.unshift(newUser);
    // }
    setOrganizationAccountFormField(orgAccountFields.administrator, newAdmin);

    console.log("administrator: " + organizationAccountFormData.administrator);
    // setFormData({...formData, users: currentUsers});
    // console.log("Current Users: " + JSON.stringify(currentUsers));
  };

  //TODO: Check fields
  const isFormValid = true;

  const createLdap = async () => {
    let completeAccount = {organization: organizationFormData, orgAccount: organizationAccountFormData, users: usersFormData.users, idpAccount: idpAccountFormData};


    console.log("Persisting new account to DB: " + JSON.stringify(completeAccount));

    if (isFormValid) {
      let createLdapAccountResponse = await accountsActions.create(completeAccount, getAccessToken);
      console.log("createLdapAccountResponse: ", JSON.stringify(createLdapAccountResponse));

      if (createLdapAccountResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${completeAccount.accountName}.  Error returned: ${JSON.stringify(createLdapAccountResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        setErrors(errorMsg);
      }
      else {
        setHasSaved(true);
      }
    }
  };

  // TODO: Implement if needed
  const updateLdapAccount = async (newLdapUserData) => {
    //   if(isFormValid) {
    //     try {
    //       console.log("Persisting values in ChangeMap : " + JSON.stringify(changeMap));
    //       // TODO: Should this be 'Name'?
    //       const response = await accountsActions.update(newLdapUserData._id, changeMap, getAccessToken);
    //       console.log("Response data: " + JSON.stringify(response.data));
    //       setLdapUserData({ ...response.data });
    //       setChangeMap({});
    //     }
    //     catch (err) {
    //       console.log(err.message);
    //     }
    //   }
    //
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    console.log("Setting opsera account to: " + JSON.stringify(selectedOption));
    console.log("option.organizationName: " + option["organizationName"]);
    console.log("Opsera User Selected: " + JSON.stringify(option));
    setOrganizationFormField("orgName", option["organizationName"]);
    setOrganizationFormField("orgOwner", option["firstName"] + " " + option["lastName"]);
    setOrganizationFormField("orgOwnerEmail", option["email"]);
    setOrganizationAccountFormField("orgDomain", option["domain"]);
    setOrganizationAccountFormField("org", option["organizationName"]);
    // setFormField("opseraId", option._id);
    addAdmin(option);
    setCurrentOpseraUser(option);
  };

  return (
    <>
      {isLoading ? <Loading size="sm"/> : null}
      {!isLoading && <>
        <div className="scroll-y full-height">
          {error.length > 0 && <>
            <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
          </>}

          <div>
            {/*// TODO: Make these boxes more unique*/}
            <div className="content-container content-card-1 max-content-width m-3">
              <div className="pt-2 pl-2 content-block-header">
                <h5 className="text-center">Organization</h5>
              </div>
              <div className="p-3">
                <Row>
                  <Col>
                    <div className="custom-select-input">
                      <label className="mt-0"><span>{orgFields.opseraId.label}{orgFields.opseraId.rules.isRequired ?
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
                  <Col>
                    <TextInput field={orgFields.name} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput disabled={true} field={orgFields.orgName} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput disabled={true} field={orgFields.orgOwner} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput disabled={true} field={orgFields.orgOwnerEmail} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgFields.description} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgFields.envCount} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgFields.numberOfLicenses} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgFields.objectCount} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ItemInput field={orgFields.subscription} setData={setOrganizationFormField}
                               formData={organizationFormData}/>
                  </Col>
                </Row>
              </div>
                <div className="content-block-footer"/>
            </div>
            <div className="content-container content-card-1 max-content-width m-3">
              <div className="pt-2 pl-2 content-block-header">
                <h5 className="text-center">Organization Account</h5>
              </div>
              <div className="p-3">
                <Row>
                  <Col>
                    <TextInput disabled={true} field={orgAccountFields.org} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput disabled={true} field={orgAccountFields.orgDomain} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgAccountFields.name} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgAccountFields.accountName} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgAccountFields.description} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgAccountFields.configEntryType} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgAccountFields.entityID} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgAccountFields.idpPostURL} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={orgAccountFields.idpVendor} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ItemInput field={orgAccountFields.idpReturnAttributes} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ToggleInput field={orgAccountFields.isMultipleIDP} setData={setOrganizationAccountFormField}
                               formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ToggleInput field={orgAccountFields.localAuth} setData={setOrganizationAccountFormField}
                                 formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ToggleInput field={orgAccountFields.samlEnabled} setData={setOrganizationAccountFormField}
                                 formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ToggleInput field={orgAccountFields.oAuthEnabled} setData={setOrganizationAccountFormField}
                                 formData={organizationAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        {/*Show Admin User*/}
                        <Form.Group className="custom-text-input" controlId={orgAccountFields.administrator.id}>
                          <Form.Label>
                            <span>{orgAccountFields.administrator.label}{orgAccountFields.administrator.rules.isRequired ? <span className="danger-red">*</span> : null } </span>
                          </Form.Label>
                          <Form.Control disabled={true} value={currentOpseraUser ? currentOpseraUser.firstName + " " + currentOpseraUser.lastName : ""} />
                          <Form.Text>
                            <div>{orgAccountFields.administrator.fieldText}</div>
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div className="content-block-footer"/>
            </div>
            <div className="content-container content-card-1 max-content-width m-3">
              <div className="pt-2 pl-2 content-block-header">
                <h5 className="text-center">User Accounts</h5>
              </div>
              <div className="p-3">
                <Row>
                  <Col>
                    <UserInput field={ ldapUsersMetadata.users } setData={setUsersFormField} formData={usersFormData}/>
                  </Col>
                </Row>
              </div>
              <div className="content-block-footer"/>
            </div>
            <div className="content-container content-card-1 max-content-width m-3">
              <div className="pt-2 pl-2 content-block-header">
                <h5 className="text-center">IDP Account</h5>
              </div>
              <div className="p-3">
                <Row>
                  <Col>
                    <TextInput field={idpFields.name} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.domain} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.idpRedirectURI} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.clientID} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.issuer} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.baseUrl} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.idpVendor} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.configEntryType} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput field={idpFields.idpNameIDMapping} setData={setIdpAccountFormField}
                               formData={idpAccountFormData}/>
                  </Col>
                </Row>
              </div>
              <div className="content-block-footer"/>
            </div>
          </div>
        </div>
        <Row>
          <div className="ml-auto px-3">
            {/*{newLdapUser ?*/}
              <Button size="sm" disabled={true || isSaving || hasSaved} variant="primary" onClick={() => createLdap()}>Create Account</Button>
            {// : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0}
              //           onClick={() => updateLdapAccount(ldapUserData)}>Save changes</Button>
            }
          </div>
          {isSaving && <div className="text-center"><FontAwesomeIcon icon={faSpinner} spin className="ml-1" fixedWidth/>Saving is in progress</div>}
          {hasSaved && <div className="text-center">Your account has been created</div>}
        </Row>

      </>
      }
    </>
  );
}

LdapCustomerOnboardEditorPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  canDelete: PropTypes.bool,
  newLdapUser: PropTypes.bool,
  handleClose: PropTypes.func
};

LdapCustomerOnboardEditorPanel.defaultProps = {
  newLdapUser: true,
};

export default LdapCustomerOnboardEditorPanel;


