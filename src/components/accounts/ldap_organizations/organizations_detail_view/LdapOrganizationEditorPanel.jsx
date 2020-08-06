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
import {capitalizeFirstLetter} from "../../../common/helpers/string-helpers";

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

function LdapOrganizationEditorPanel({ ldapOrganizationData, newLdapOrganization, setLdapOrganizationData, handleClose }) {
  const [error, setErrors] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [fields, setOrgFields ] = useState({ ...ldapOrganizationsFormFields });
  const [ changeMap, setChangeMap] = useState({});
  const [ formData, setFormData] = useState(INITIAL_ORGANIZATION_DATA);
  const [ opseraUserList, setOpseraUsersList] = useState([]);
  const [ currentOpseraUser, setCurrentOpseraUser ] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData(ldapOrganizationData);
  }, []);

  const loadData = async (ldapOrganizationData) => {
    setIsLoading(true);
    await loadOpseraUsers();
    await unpackLdapOrganizationData(ldapOrganizationData);
    setIsLoading(false);
  };

  const unpackLdapOrganizationData = async (ldapOrganizationData) => {
    console.log("ldapOrganizationData in unpackLdapUserData: " + JSON.stringify(ldapOrganizationData));
    if (ldapOrganizationData != null) {
      setFormField("name", ldapOrganizationData["name"] != null ? ldapOrganizationData["name"] : "");
      setFormField("description", ldapOrganizationData["description"] != null ? ldapOrganizationData["description"] : "");
      setFormField("envCount", ldapOrganizationData["envCount"] != null ? ldapOrganizationData["envCount"] : "");
      setFormField("numberOfLicenses", ldapOrganizationData["numberOfLicenses"] != null ? ldapOrganizationData["numberOfLicenses"] : "");
      setFormField("objectCount", ldapOrganizationData["objectCount"] != null ? ldapOrganizationData["objectCount"] : "");
      setFormField("orgName", ldapOrganizationData["orgName"] != null ? ldapOrganizationData["orgName"] : "");
      setFormField("orgOwner", ldapOrganizationData["orgOwner"] != null ? ldapOrganizationData["orgOwner"] : "");
      setFormField("orgOwnerEmail", ldapOrganizationData["orgOwnerEmail"] != null ? ldapOrganizationData["orgOwnerEmail"] : "");
      setFormField("subscription", ldapOrganizationData["subscription"] != null ? ldapOrganizationData["subscription"] : "");
    }
    setIsLoading(false);
  };


  const loadOpseraUsers = async () => {
    const response = await accountsActions.getUsers(getAccessToken);
    console.log("Opsera Users: \n" + JSON.stringify(Object.keys(response.data)));

    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
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

  //TODO: Check fields
  const isFormValid = true;

  const createOrganization = async (newLdapOrganizationData) => {
    let ldapOrganization = {organization: newLdapOrganizationData}
    console.log("Persisting new organization to DB: " + JSON.stringify(ldapOrganization));

    if(isFormValid) {
      let createLdapOrganizationResponse = await accountsActions.create(ldapOrganization, getAccessToken);
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

  const updateLdapOrganization = async () => {
    if(isFormValid) {
      try {
        let organizationUpdate = {name: ldapOrganizationData.name, ...changeMap};
        console.log("Persisting values in organizationUpdate : " + JSON.stringify(organizationUpdate));
        const response = await accountsActions.updateOrganization(organizationUpdate, getAccessToken);
        console.log("Response data: " + JSON.stringify(response.data));
        setLdapOrganizationData({ldapOrganizationData, ...response.data });
        setChangeMap({});
      }
      catch (err) {
        console.log(err.message);
      }
    }

  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    console.log("Setting opsera account to: " + JSON.stringify(selectedOption));
    console.log("option.organizationName: " + option["organizationName"]);
    setFormField("orgOwner", option["firstName"] + " " + option["lastName"]);
    setFormField("orgOwnerEmail", option["email"]);
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
            <Col lg={12}>
              <div className="custom-select-input">
                <label className="mt-0"><span>{fields["opseraId"].label}{fields["opseraId"].rules.isRequired ? <span className="danger-red">*</span> : null } </span></label>
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
              <TextInput disabled={!newLdapOrganization} field={ fields.name } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={ fields.description } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={ fields.orgName } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={ fields.orgOwner } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={ fields.orgOwnerEmail } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={ fields.envCount } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={ fields.numberOfLicenses } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={ fields.objectCount } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={ fields.subscription } setData={setFormField} formData={formData}/>
              {/*<ItemInput disabled={true} field={ fields.subscription } setData={setFormField} formData={formData}/>*/}
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
              {newLdapOrganization ? <Button size="sm" variant="primary" onClick={() => createOrganization(ldapOrganizationData)}>Create Organization</Button>
                : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => updateLdapOrganization()}>Save Changes</Button>
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


