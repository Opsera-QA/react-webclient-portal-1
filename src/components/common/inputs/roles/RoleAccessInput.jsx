import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdCard, faPlus, faTimes} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import {
  getOrganizationByDomain,
} from "components/admin/accounts/ldap/organizations/organization-functions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";

const roleTypes = [
  {text: "Administrator", value: "administrator"},
  {text: "Manager", value: "manager"},
  {text: "User", value: "user"},
  {text: "Guest", value: "guest"},
  {text: "SecOps", value: "secops"}
];

function RoleAccessInput({ fieldName, dataObject, setDataObject}) {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [groupList, setGroupList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [properties, setProperties] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);

  useEffect(() => {
    loadData();
    unpackData();
  }, []);

  const loadData = async () => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      // TODO: Should this be pulled from ldap domain associated to pipeline owner
      if (ldap.domain != null) {
        await getGroupsByDomain(ldap.domain);
        await getUsersByDomain(ldap.domain);
      }
    }
  };

  const getGroupsByDomain = async (ldapDomain) => {
    try {
      setLoadingGroups(true)
      let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);

      if (organization?.groups) {
        setGroupList(organization?.groups);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    } finally {
      setLoadingGroups(false);
    }
  };

  const getUsersByDomain = async (ldapDomain) => {
    try {
      let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
      setLoadingUsers(true)

      if (organization?.users) {
        setUserList(organization?.users);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const unpackData = () => {
    let currentData = dataObject.getData(fieldName);
    let items = [];

    if (Array.isArray(currentData) && currentData.length > 0)
    {
      currentData.map((item) => {
        items.push(
          {
            _id: item["_id"],
            role: item["role"],
            user: item["user"],
            group: item["group"],
            createdAt: item["createdAt"],
            updatedAt: item["updatedAt"],
            roleAccessType: item["user"] !== null ?  "user" : "group"
          }
        );
      });
    }
    else {
      items.push({role: "", user: "", group: "", roleAccessType: "group"});
    }

    setProperties([...items]);
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = {...dataObject};

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of role access items. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((item) => {
        if (item["role"] === "" || (item["user"] === "" && item["group"] === "")) {
          return;
        }

        newArray.push(
          {
            _id: item["_id"],
            role: item["role"],
            user: item["user"] !== "" ? item["user"] : null,
            group: item["group"] !== "" ? item["group"] : null,
            createdAt: item["createdAt"],
            updatedAt: item["updatedAt"],
          }
        );
      });
    }

    newDataObject.setData(fieldName, [...newArray]);
    setDataObject({...newDataObject});
  }

  const addProperty = () => {
    let newPropertyList = properties;
    let lastObject = newPropertyList[newPropertyList.length - 1];

    // Do not add another row if key is not configured for last row
    if (lastObject?.role === "" || (lastObject?.user === "" && lastObject?.group === "")) {
      return;
    }

    let newRow = {role: "", user: "", group: "", roleAccessType: "group"};
    newPropertyList.push(newRow);
    validateAndSetData(newPropertyList);
  };

  const deleteProperty = (index) => {
    let newPropertyList = properties
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const updateProperty = (row, innerField, newValue) => {
    let newPropertyList = properties
    let index = newPropertyList.indexOf(row);

    if (newPropertyList[index][innerField] !== newValue) {
      if (innerField === "roleAccessType") {
        newPropertyList[index]["group"] = "";
        newPropertyList[index]["user"] = "";
      }

      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/>
      </Button>
    )
  };

  const getAddPropertyButton = () => {
    return (
      <Row>
        <div className="ml-auto mt-3 mr-3 d-flex">
          <Button variant="secondary" onClick={() => addProperty()} size="sm">
            <span className="text-white"><FontAwesomeIcon className="text-white mr-2" icon={faPlus} fixedWidth />Add Role</span>
          </Button>
        </div>
      </Row>
    );
  }

  const getAssigneeInput = (property) => {
    if (property["roleAccessType"] === "user") {
      return (
        <DropdownList
          data={userList}
          valueField={"emailAddress"}
          textField={(item) => item != null && typeof item === "object" ? `${item.name} (${item.emailAddress})` : item}
          value={property["user"]}
          busy={loadingUsers}
          filter={"contains"}
          placeholder={"Select A User"}
          onChange={(value) => updateProperty(property, "user", value["emailAddress"])}
        />
      );
    }

    return (
      <DropdownList
        data={groupList}
        valueField={"name"}
        textField={"name"}
        value={property["group"]}
        busy={loadingGroups}
        filter={"contains"}
        placeholder={"Select A Group"}
        onChange={(value) => updateProperty(property, "group", value["name"])}
      />
    );
  };

  const getPropertyRow = (property, index) => {
    return (
      <div className="d-flex my-2 justify-content-between" key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={2}>
              <div className="mt-2 w-100 d-flex">
                <div className="ml-auto">
                  <input
                    className="mx-2"
                    type="radio"
                    name={`roleAccessType-${index}`}
                    value={"group"}
                    checked={property["roleAccessType"] === "group"}
                    onChange={() => updateProperty(property, "roleAccessType", "group")}/>Group
                </div>
                <div className="mr-auto">
                  <input
                    className="mx-2"
                    type="radio"
                    name={`roleAccessType-${index}`}
                    value={"user"}
                    checked={property["roleAccessType"] === "user"}
                    onChange={() => updateProperty(property, "roleAccessType", "user")}/>User
                </div>
              </div>
            </Col>
            <Col sm={5} className={"pl-1 pr-0"}>
              {getAssigneeInput(property)}
            </Col>
            <Col sm={5} className={"pl-2 pr-1"}>
              <DropdownList
                className=""
                data={roleTypes}
                valueField={"value"}
                textField={"text"}
                value={property["role"]}
                filter={"contains"}
                placeholder={"Select Role Type"}
                onChange={(value) => updateProperty(property, "role", value["value"])}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {
    if (!properties || properties.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted no-data-message">No configuration properties have been added to this Tag</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {properties.map((property, index) => {
          return getPropertyRow(property, index);
        })}
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between mx-2">
        <div className="mt-2"><FontAwesomeIcon icon={faIdCard} fixedWidth className="mr-1"/>{field.label}</div>
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <div className={"mr-auto ml-3 mt-1"}>
          <span className="text-muted ml-5">Type</span>
        </div>
        <div className={"mx-auto mt-1"}>
          <span className="text-muted">Assignee</span>
        </div>
        <div className={"mx-auto mr-5 mt-1"}>
          <span className="text-muted">Role Type</span>
        </div>
        <div />
      </div>
    );
  };


  if (field == null) {
    return <></>;
  }

  return (
    <div className="object-properties-input">
      <div className="content-container">
        <div className="pl-2 pr-3 property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        <div>
          {getHeaderBar()}
        </div>
        <div className="properties-body-alt">
          {getFieldBody()}
        </div>
      </div>
      <div>{getAddPropertyButton()}</div>
      <InfoText field={field} errorMessage={errorMessage} />
    </div>
  );
}

RoleAccessInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
};

export default RoleAccessInput;