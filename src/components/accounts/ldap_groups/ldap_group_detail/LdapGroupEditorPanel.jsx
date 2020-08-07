import React, {useEffect, useState, useContext} from "react";
import {Button, Form, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import ldapGroupFormFields from "components/accounts/ldap_groups/ldap-groups-form-fields.js";
import accountsActions from "components/accounts/accounts-actions.js";
import TextInput from "../../../common/input/text-input";
import Row from "react-bootstrap/Row";
import ToggleInput from "../../../common/input/toggle-input";
import SelectInput from "../../../common/input/select-input";

const INITIAL_GROUP_DATA = {
  name: "",
  configGroupType: [],
  externalSyncGroup: "",
  isSync: true,
};

function LdapGroupEditorPanel({ldapGroupData, ldapOrganizationData, onGroupUpdate, newLdapGroup, handleClose}) {
  const fields = ldapGroupFormFields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setErrors] = useState("");
  const [formData, setFormData] = useState(INITIAL_GROUP_DATA);
  const [changeMap, setChangeMap] = useState({});
  const groupTypeOptions = ["Project", "Tag", "Custom"]

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // setIsLoading(true);
    await unpackLdapGroupData(ldapGroupData);
    // setIsLoading(false);
  };

  const unpackLdapGroupData = async (ldapGroupData) => {
    console.log("ldapGroupData in unpackLdapGroupData: " + JSON.stringify(ldapGroupData));
    if (ldapGroupData != null) {
      setFormField("name", formData["name"] != null ? ldapGroupData["name"] : "");
      setFormField("configGroupType", formData["configGroupType"] != null ? ldapGroupData["configGroupType"] : "");
      setFormField("externalSyncGroup", formData["externalSyncGroup"] != null ? ldapGroupData["externalSyncGroup"] : "");
      setFormField("isSync", formData["isSync"] != null ? ldapGroupData["isSync"] : true);
    }

    // setIsLoading(false);
  };

  const setFormField = (field, value) => {
    console.log("Setting form field: " + field + " value: " + JSON.stringify(value));

    if (value === ldapGroupData[field]) {
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

    if (newLdapGroup) {
      ldapGroupData[field] = value;
      setFormData({...formData});
    }
  };

  const isFormValid = true;

  const createGroup = async () => {
    let payload = {
      "domain": ldapOrganizationData.orgDomain,
      "group": {
        ...formData
      }
    };
    if (isFormValid) {
      const response = await accountsActions.createGroup(payload, getAccessToken);
      handleClose();
    }
  };


  const updateGroup = async () => {
    let payload = {
      "domain": ldapOrganizationData.orgDomain,
      "group": {
        ...formData
      }
    };
    if (isFormValid) {
      const response = await accountsActions.updateGroup(payload, getAccessToken);
      onGroupUpdate(response.data);
    }
  };

  return (
    <>
      <div className="p-3">
        {error.length > 0 && <>
          <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
        </>}
        <Row>
          <Col lg={12}>
            <TextInput disabled={!newLdapGroup} field={fields.name} setData={setFormField} formData={formData}/>
          </Col>
          <Col lg={12}>
            {formData.configGroupType == null || groupTypeOptions.includes(formData.configGroupType)
              ? <SelectInput field={fields.configGroupType} setData={setFormField} formData={formData} selectOptions={groupTypeOptions}/>
              : <TextInput disabled={true} field={fields.configGroupType} setData={setFormField} formData={formData} />}
          </Col>
          <Col lg={12}>
            <TextInput disabled={formData.configGroupType === "Role"} field={fields.externalSyncGroup} setData={setFormField} formData={formData}/>
          </Col>
          <Col lg={12}>
            <ToggleInput disabled={formData.configGroupType === "Role"} field={fields.isSync} setData={setFormField} formData={formData}/>
          </Col>
        </Row>
        <Row>
          <div className="ml-auto px-3">
            {newLdapGroup ? <Button size="sm" variant="primary" onClick={() => createGroup()}>Create Group</Button>
              : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0}
                        onClick={() => updateGroup()}>Save Changes</Button>
            }
          </div>
        </Row>
      </div>
    </>
  );
}

LdapGroupEditorPanel.propTypes = {
  newLdapGroup: PropTypes.bool,
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  onGroupUpdate: PropTypes.func,
  handleClose: PropTypes.func
};

LdapGroupEditorPanel.defaultProps = {
  newLdapGroup: false,
}

export default LdapGroupEditorPanel;


