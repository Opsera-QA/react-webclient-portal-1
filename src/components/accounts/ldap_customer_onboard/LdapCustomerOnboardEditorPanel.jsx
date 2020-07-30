import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../../../contexts/AuthContext";
import accountsActions from "../accounts-actions";
import TextInput from "../../common/input/text-input";
import Loading from "../../common/loading";
import {
  ldapCustomerIdpAccountsFormFields,
  ldapCustomerOnboardFormFields,
  ldapCustomerOnboardUserFormFields,
  ldapCustomerOrgFormFields
} from "./ldap-customer-onboard-form-fields";
import ToggleInput from "../../common/input/toggle-input";
import SelectInput from "../../common/input/select-input";
import DropdownList from "react-widgets/lib/DropdownList";
import ItemInput from "../../common/input/item-input";
import UserInput from "./user-input";

const INITIAL_DATA = {
  opseraId: "",
  accountName: "",
  name: "",
  description: "",
  localAuth: false,
  samlEnabled: false,
  oAuthEnabled: false,
  idpPostURL: "",
  idpVendor: "",
  configEntryType: "",
  entityID: "",
  isMultipleIDP: false,
  idpReturnAttributes: [],
  orgDomain: "",
  users: [],
  orgs: {
    description: "",
    envCount: "",
    numberOfLicenses: "",
    objectCount: "",
    orgName: "",
    orgOwner: "",
    orgOwnerEmail: "",
    subscription: [],
  },
  idpAccounts: {
    name: "",
    idpRedirectURI: "",
    clientID: "",
    issuer: "",
    baseUrl: "",
    idpVendor: "",
    configEntryType: "",
    idpNameIDMapping: "",
  }
};

function LdapCustomerOnboardEditorPanel({ ldapUserData, newLdapUser, setLdapUserData, handleClose }) {
  const [error, setErrors] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [fields, setFields ] = useState({ ...ldapCustomerOnboardFormFields });
  const [userFields, setUserFields ] = useState({ ...ldapCustomerOnboardUserFormFields });
  const [orgFields, setOrgFields ] = useState({ ...ldapCustomerOrgFormFields });
  const [idpFields, setIdpFields ] = useState({ ...ldapCustomerIdpAccountsFormFields });
  const [ changeMap, setChangeMap] = useState({});
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [ opseraUserList, setOpseraUsersList] = useState([]);
  const [ currentOpseraUser, setCurrentOpseraUser ] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData(ldapUserData);
  }, []);

  const loadData = async (ldapUserData) => {
    setIsLoading(true);
    await loadOpseraUsers();
    // await unpackLdapUserData(ldapUserData);
    setIsLoading(false);
  };

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
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user =>
    {
      parsedUserNames.push({ text: ("Name: " + user["firstName"] + " " + user["lastName"]),  id: user });
    });
    console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
    setOpseraUsersList(parsedUserNames);
  };

  // TODO: If these will be used for editing, implement a change map
  //Look at tag admin for example
  const setFormField = (field, value) => {
    console.log("Setting form field: " + field + " value: " + JSON.stringify(value));
    formData[field] = value;
    setFormData({ ...formData });
  };

  const setOrgFormField = (field, value) => {
    console.log("Setting orgs form field: " + field + " value: " + JSON.stringify(value));
    formData["orgs"][field] = value;
    setFormData({ ...formData, orgs: formData["orgs"] });
    console.log("FormData; " + JSON.stringify(formData));
  };

  const setIdpFormField = (field, value) => {
    console.log("Setting form field: " + field + " value: " + JSON.stringify(value));
    formData["idpAccounts"][field] = value;
    setFormData({ ...formData, idpAccounts: formData["idpAccounts"] });
  };

  const addAdmin = (user) => {
    let currentUsers = formData["users"];

    let newUser = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      departmentName: user.organizationName
    };

    // TODO: Check for existing admin and remove that
    currentUsers.unshift(newUser);
    setFormData({ ...formData, users: currentUsers });
    console.log("Current Users: " + JSON.stringify(currentUsers));
  };

  //TODO: Check fields
  const isFormValid = true;

  const createLdap = async (newLdapUserData) => {
    console.log("Persisting new user to DB: " + JSON.stringify(newLdapUserData));

    if(isFormValid) {
      let createLdapResponse = await accountsActions.create(newLdapUserData, getAccessToken);
      console.log("createLdapResponse: ", JSON.stringify(createLdapResponse));

      if (createLdapResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${newLdapUserData.accountName}.  Error returned: ${JSON.stringify(createLdapResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        setErrors(errorMsg);
      }
      else {
        handleClose();
      }
    }
  };

  const updateLdapUser = async (newLdapUserData) => {
    if(isFormValid) {
      try {
        console.log("Persisting values in ChangeMap : " + JSON.stringify(changeMap));
        // TODO: Should this be 'Name'?
        const response = await accountsActions.update(newLdapUserData._id, changeMap, getAccessToken);
        console.log("Response data: " + JSON.stringify(response.data));
        setLdapUserData({ ...response.data });
        setChangeMap({});
      }
      catch (err) {
        console.log(err.message);
      }
    }

  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    console.log("Setting opsera account to: " + JSON.stringify(selectedOption));
    console.log("option.organizationName: " + option["organizationName"]);
    setCurrentOpseraUser(option);
    setOrgFormField("orgName", option["organizationName"]);
    setOrgFormField("orgOwnerEmail", option["email"]);
    setFormField("orgDomain", option["domain"]);
    addAdmin(option);
    // setUserFormField()
  };

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {error.length > 0 && <>
            <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
          </>}
          <Row>
            <Col>
              <div className="custom-select-input">
                <label className="mt-0"><span>{fields["opseraId"].label}{fields["opseraId"].rules.isRequired ? <span className="danger-red">*</span> : null } </span></label>
                <DropdownList
                  data={opseraUserList}
                  valueField='value'
                  textField='text'
                  filter='contains'
                  defaultValue={undefined}
                  onChange={handleOpseraUserChange}
                />
              </div>
            </Col>
          </Row>

          {/*"org" portion TODO: Should we create separate panels?*/}
          <Row>
            <Col>
              <TextInput field={ orgFields.description } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.envCount } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.numberOfLicenses } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.objectCount } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.orgName } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          {/*Populate from dropdown TODO: Disable?*/}
          <Row>
            <Col>
              <TextInput field={ orgFields.orgOwner } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.orgOwnerEmail } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemInput field={ orgFields.subscription } setData={setOrgFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>

          {/*Top level fields*/}
          <Row>
            <Col>
              <TextInput field={ fields.accountName } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={fields.name} setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={fields.description} setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ToggleInput field={ fields.localAuth } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ToggleInput field={ fields.samlEnabled } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ToggleInput field={ fields.oAuthEnabled } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.idpPostURL } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.idpVendor } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.configEntryType } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.entityID } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ToggleInput field={ fields.isMultipleIDP } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemInput field={ fields.idpReturnAttributes } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.orgDomain } setData={setFormField} formData={formData}/>
            </Col>
          </Row>

          {/*"Users" section*/}
          <Row>
            <Col>
              <UserInput opseraUser={currentOpseraUser} field={ fields.users } setData={setFormField} formData={formData}/>
            </Col>
          </Row>

          {/*"idpAccounts" section*/}
          <Row>
            <Col>
              <TextInput field={ idpFields.name } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ idpFields.idpRedirectURI } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ idpFields.clientID } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ idpFields.issuer } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ idpFields.baseUrl } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ idpFields.idpVendor } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ idpFields.configEntryType } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ idpFields.idpNameIDMapping } setData={setFormField} formData={formData["idpAccounts"]}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
              {newLdapUser ? <Button size="sm" variant="primary" onClick={() => createLdap(ldapUserData)}>Create LDAP User</Button>
                : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => updateLdapUser(ldapUserData)}>Save changes</Button>
              }
            </div>
          </Row>
        </div>
      </>}
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


