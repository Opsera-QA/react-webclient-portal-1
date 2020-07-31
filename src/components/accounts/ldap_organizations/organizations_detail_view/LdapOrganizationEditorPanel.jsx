import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import ldapOrganizationsFormFields from "../ldap-organizations-form-fields";
import accountsActions from "../../accounts-actions";
import Loading from "../../../common/loading";
import { AuthContext } from "../../../../contexts/AuthContext";
import TextInput from "../../../common/input/text-input";
import ItemInput from "../../../common/input/item-input";

const INITIAL_DATA = {
    description: "",
    envCount: "",
    numberOfLicenses: "",
    objectCount: "",
    orgName: "",
    orgOwner: "",
    orgOwnerEmail: "",
    subscription: [],
    opseraId: ""
};

function LdapOrganizationEditorPanel({ ldapOrganizationData, newLdapOrganization, setLdapOrganizationData, handleClose }) {
  const [error, setErrors] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [fields, setOrgFields ] = useState({ ...ldapOrganizationsFormFields });
  const [ changeMap, setChangeMap] = useState({});
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [ opseraUserList, setOpseraUsersList] = useState([]);
  const [ currentOpseraUser, setCurrentOpseraUser ] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData(ldapOrganizationData);
  }, []);

  const loadData = async (ldapOrganizationData) => {
    setIsLoading(true);
    await loadOpseraUsers();
    // await unpackLdapUserData(ldapUserData);
    setIsLoading(false);
  };

  const unpackLdapUserData = async (ldapOrganizationData) => {
    console.log("ldapUserData in unpackLdapUserData: " + JSON.stringify(ldapOrganizationData));
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

  const setFormField = (field, value) => {
    console.log("Setting form field: " + field + " value: " + JSON.stringify(value));

    if (value === ldapOrganizationData[field])
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

    if (newLdapOrganization)
    {
      ldapOrganizationData[field] = value;
      setLdapOrganizationData({ ...ldapOrganizationData });
    }
  };

  const addAdmin = (user) => {
    let currentUsers = formData["users"];

    let newUser = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      departmentName: user.organizationName,
      administrator: true
    };

    if (currentUsers[0] != null && currentUsers[0].administrator === true) {
      currentUsers[0] = newUser;
    }
    else {
      currentUsers.unshift(newUser);
    }

    setFormData({ ...formData, users: currentUsers });
    console.log("Current Users: " + JSON.stringify(currentUsers));
  };

  //TODO: Check fields
  const isFormValid = true;

  const createOrganization = async (newLdapOrganizationData) => {
    console.log("Persisting new organization to DB: " + JSON.stringify(newLdapOrganizationData));

    if(isFormValid) {
      let createLdapOrganizationResponse = await accountsActions.create(newLdapOrganizationData, getAccessToken);
      console.log("createLdapResponse: ", JSON.stringify(createLdapOrganizationResponse));

      if (createLdapOrganizationResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${newLdapOrganizationData.accountName}.  Error returned: ${JSON.stringify(createLdapOrganizationResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        setErrors(errorMsg);
      }
      else {
        handleClose();
      }
    }
  };

  const updateLdapOrganization = async (newLdapOrganizationData) => {
    if(isFormValid) {
      try {
        console.log("Persisting values in ChangeMap : " + JSON.stringify(changeMap));
        // TODO: Should this be 'Name'?
        const response = await accountsActions.update(newLdapOrganizationData.email, changeMap, getAccessToken);
        console.log("Response data: " + JSON.stringify(response.data));
        setLdapOrganizationData({ ...response.data });
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
    setFormField("orgName", option["organizationName"]);
    setFormField("orgOwnerEmail", option["email"]);
    setFormField("orgDomain", option["domain"]);
    // addAdmin(option);
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
          <Row>
            <Col>
              <TextInput field={ fields.description } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.envCount } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.numberOfLicenses } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.objectCount } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.orgName } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          {/*Populate from dropdown TODO: Disable?*/}
          <Row>
            <Col>
              <TextInput field={ fields.orgOwner } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ fields.orgOwnerEmail } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemInput field={ fields.subscription } setData={setFormField} formData={formData}/>
            </Col>
          </Row>

          {/*/!*Top level fields*!/*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ fields.accountName } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={fields.name} setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={fields.description} setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <ToggleInput field={ fields.localAuth } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <ToggleInput field={ fields.samlEnabled } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <ToggleInput field={ fields.oAuthEnabled } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ fields.idpPostURL } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ fields.idpVendor } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ fields.configEntryType } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ fields.entityID } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <ToggleInput field={ fields.isMultipleIDP } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <ItemInput field={ fields.idpReturnAttributes } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ fields.orgDomain } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          {/*/!*"Users" section*!/*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <UserInput field={ fields.users } setData={setFormField} formData={formData}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          {/*/!*"idpAccounts" section*!/*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.name } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.idpRedirectURI } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.clientID } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.issuer } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.baseUrl } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.idpVendor } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.configEntryType } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <TextInput field={ idpFields.idpNameIDMapping } setData={setFormField} formData={formData["idpAccounts"]}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Row>
            <div className="ml-auto px-3">
              {newLdapOrganization ? <Button size="sm" variant="primary" onClick={() => createOrganization(ldapOrganizationData)}>Create Organization</Button>
                : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => updateLdapOrganization(ldapOrganizationData)}>Save Changes</Button>
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
  canDelete: PropTypes.bool,
  newLdapOrganization: PropTypes.bool,
  handleClose: PropTypes.func
};

LdapOrganizationEditorPanel.defaultProps = {
  newLdapOrganization: false,
};

export default LdapOrganizationEditorPanel;


