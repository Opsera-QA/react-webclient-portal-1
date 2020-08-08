import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import TextInput from "../../../common/input/text-input";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "../../../common/loading";
import accountsActions from "../../accounts-actions";
import ldapUsersFormFields from "../ldap-users-form-fields";
import {getFromValidationErrorToast, getPersistToast} from "../../../common/toasts/toasts";

const INITIAL_DATA = {
  name: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  preferredName: "",
  division: "",
  teams: [],
  title: "",
  departmentName: "",
  site: ""
};

function LdapUserEditorPanel({ ldapUserData, newLdapUser, setLdapUserData, handleClose, showButton }) {
  const { getAccessToken } = useContext(AuthContext);
  const [fields, setFields ] = useState({ ...ldapUsersFormFields });
  const [ changeMap, setChangeMap] = useState({});
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await unpackLdapUserData();
    setIsLoading(false);
  };

  const unpackLdapUserData = async () => {
    console.log("ldapUserData in unpackLdapUserData: " + JSON.stringify(ldapUserData));
    if (ldapUserData != null) {
      setFormField("name", ldapUserData["name"] != null ? ldapUserData["name"] : "");
      setFormField("firstName", ldapUserData["firstName"] != null ? ldapUserData["firstName"] : "");
      setFormField("lastName", ldapUserData["lastName"] != null ? ldapUserData["lastName"] : "");
      setFormField("emailAddress", ldapUserData["emailAddress"] != null ? ldapUserData["emailAddress"] : {});
      setFormField("departmentName", ldapUserData["departmentName"] != null ? ldapUserData["departmentName"] : false);
    }
    setIsLoading(false);
  };

  const setFormField = (field, value) => {
    // console.log("Setting form field: " + field + " value: " + JSON.stringify(value));

    if (value === ldapUserData[field])
    {
      // console.log("Removing " + field + " from change map");
      delete changeMap[field];
    }
    else
    {
      // console.log("Added " + field + " to change map: " + value);
      changeMap[field] = value;
      setChangeMap({ ...changeMap });
    }

    formData[field] = value;
    setFormData({ ...formData });


    // console.log("ChangeMap: " + JSON.stringify(changeMap));

    if (newLdapUser)
    {
      ldapUserData[field] = value;
      setLdapUserData({ ...ldapUserData });
    }
  };

  //TODO: Check fields
  const isFormValid = true;

  const createUser = async (newLdapUserData) => {
    console.log("Persisting new user to DB: " + JSON.stringify(newLdapUserData));

    if(isFormValid) {
      let createUserResponse = await accountsActions.create({ user: newLdapUserData }, getAccessToken);
      console.log("createUserResponse: ", JSON.stringify(createUserResponse));

      if (createUserResponse.error != null) {
        const errorMsg = `Microservice error reported creating the user: ${newLdapUserData.key}.  Error returned: ${JSON.stringify(createUserResponse.error.message, null, 2)}`;
        console.error(errorMsg);
        let toast = getPersistToast(false, "create", "user", errorMsg, setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      else {
        handleClose();
      }
    }
    else {
        // TODO: Wire errors up
        let toast = getFromValidationErrorToast("", setShowToast);
        setToast(toast);
        setShowToast(true);
    }
  };

  const updateLdapUser = async (newLdapUserData) => {
    if(isFormValid) {
      try {
        console.log("Persisting values in ChangeMap : " + JSON.stringify(changeMap));

        let domain = newLdapUserData.emailAddress.substring(newLdapUserData.emailAddress.lastIndexOf("@") + 1);

        const postBody = {
          domain: domain,
          user: {
            // emailAddress: newLdapUserData.emailAddress,
            ...newLdapUserData,
            ...changeMap
          }
        }
        console.log("post body: " + JSON.stringify(postBody));

        const response = await accountsActions.updateUser(postBody, getAccessToken);
        console.log("Response data: " + JSON.stringify(response));
        setLdapUserData({ ...response.data });
        setChangeMap({});
        let toast = getPersistToast(true, "update", "User", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }

  };

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {showToast && toast}
          <Row>
            <Col lg={12}>
              <TextInput field={fields.name} setData={setFormField} formData={formData} />
            </Col>
            <Col lg={12}>
              <TextInput field={fields.firstName} setData={setFormField} formData={formData} />
            </Col>
            <Col lg={12}>
              <TextInput field={fields.lastName} setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={fields.preferredName} setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={!newLdapUser} field={fields.emailAddress } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={ fields.division } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput disabled={true} field={ fields.teams } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={ fields.departmentName } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={ fields.title } setData={setFormField} formData={formData}/>
            </Col>
            <Col lg={12}>
              <TextInput field={ fields.site } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            { showButton &&
              <div className="ml-auto px-3">
                {newLdapUser ? <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => createUser(ldapUserData)}>Create LDAP User</Button>
                  : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => updateLdapUser(ldapUserData)}>Save changes</Button>
                }
              </div>
            }
          </Row>
        </div>
      </>}
    </>
  );
}

LdapUserEditorPanel.propTypes = {
  showButton: PropTypes.bool,
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  canDelete: PropTypes.bool,
  newLdapUser: PropTypes.bool,
  handleClose: PropTypes.func
};

LdapUserEditorPanel.defaultProps = {
  showButton: true,
  newLdapUser: false
};

export default LdapUserEditorPanel;


