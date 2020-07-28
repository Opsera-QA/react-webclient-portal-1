import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../../../contexts/AuthContext";
import accountsActions from "../accounts-actions";
import TextInput from "../../common/input/text-input";
import {
  ldapCustomerIdpAccountsFormFields,
  ldapCustomerOnboardFormFields,
  ldapCustomerOnboardUserFormFields,
  ldapCustomerOrgFormFields
} from "./ldap-customer-onboard-form-fields";
import ToggleInput from "../../common/input/toggle-input";

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
  idpReturnAttributes: {},
  orgDomain: "",
  users: [{}],
  orgs: {
    description: "",
    envCount: "",
    numberOfLicenses: "",
    objectCount: "",
    orgName: "",
    orgOwner: "",
    orgOwnerEmail: "",
    subscription: {},
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData(ldapUserData);
  }, []);

  const loadData = async (ldapUserData) => {
    // setIsLoading(true);
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

  const setFormField = (field, value) => {
    console.log("Setting form field: " + field + " value: " + JSON.stringify(value));

    if (value === ldapUserData[field])
    {
      console.log("Removing " + field + " from change map");
      delete changeMap[field];
    }
    else
    {
      console.log("Added " + field + " to change map: " + value);
      changeMap[field] = value;
      setChangeMap({ ...changeMap });
    }

    formData[field] = value;
    setFormData({ ...formData });


    console.log("ChangeMap: " + JSON.stringify(changeMap));

    // TODO: If we use this form for editing a user, uncomment this and make sure to pass in the boolean
    // if (newLdapUser)
    // {
    ldapUserData[field] = value;
    setLdapUserData({ ...ldapUserData });
    // }
  };

  //TODO: Check fields
  const isFormValid = true;

  const createTag = async (newLdapUserData) => {
    console.log("Persisting new user to DB: " + JSON.stringify(newLdapUserData));

    if(isFormValid) {
      let createTagResponse = await accountsActions.create(newLdapUserData, getAccessToken);
      console.log("createTagResponse: ", JSON.stringify(createTagResponse));

      if (createTagResponse.error != null) {
        const errorMsg = `Microservice error reported creating the tag: ${newLdapUserData.key}.  Error returned: ${JSON.stringify(createTagResponse.error.message, null, 2)}`;
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

  return (
    <>
      {/*{isLoading ? <Loading size="sm" /> : null}*/}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {error.length > 0 && <>
            <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
          </>}
          <Row>
            <Col>
              {/*TODO: Make select, pull from /users/get-users/ and record _id for field*/}
              {/* Make sure to pass in large number (1000) because of paging */}
              <TextInput field={ fields.opseraId } setData={setFormField} formData={formData}/>
            </Col>
          </Row>

          {/*"org" portion TODO: Should we create separate panels?*/}
          <Row>
            <Col>
              <TextInput field={ orgFields.description } setData={setFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.envCount } setData={setFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.numberOfLicenses } setData={setFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.objectCount } setData={setFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.orgName } setData={setFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          {/*Populate from dropdown TODO: Disable?*/}
          <Row>
            <Col>
              <TextInput field={ orgFields.orgOwner } setData={setFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ orgFields.orgOwnerEmail } setData={setFormField} formData={formData["orgs"]}/>
            </Col>
          </Row>
          {/*TODO: Make multi-entry like old tag ui*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ orgFields.subscription } setData={setFormField} formData={formData["org"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}

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

          {/*TODO: Make multi-entry like old tag ui*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ fields.idpReturnAttributes } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Row>
            <Col>
              <ToggleInput field={ fields.orgDomain } setData={setFormField} formData={formData}/>
            </Col>
          </Row>

          {/*"Users" section*/}
          <Row>
            <Col>
              {/* TODO: Make way to input multiple users*/}
              {/*<ToggleInput field={ fields.users } setData={setFormField} formData={formData}/>*/}
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
              {newLdapUser ? <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => createTag(ldapUserData)}>Create LDAP User</Button>
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
  newLdapUser: false
};

export default LdapCustomerOnboardEditorPanel;


