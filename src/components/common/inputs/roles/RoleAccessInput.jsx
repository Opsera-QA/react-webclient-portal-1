import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faIdCard, faTimes} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import RoleAccessEditorHelpOverlayContainer from "components/common/help/input/role_access_editor/RoleAccessEditorHelpOverlayContainer";
import axios from "axios";

const roleTypes = [
  {text: "Administrator", value: "administrator"},
  {text: "Manager", value: "manager"},
  // {text: "SecOps", value: "secops"},
  {text: "User", value: "user"},
  {text: "Guest", value: "guest"},
];

function RoleAccessInput({ fieldName, dataObject, setDataObject}) {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [groupList, setGroupList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [roles, setRoles] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    unpackData();

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (ldap.domain != null) {
        await getGroupsByDomain(cancelSource, ldap.domain);
        await getLdapUsers(cancelSource, ldap.domain);
      }
    }
  };

  const getGroupsByDomain = async (cancelSource = cancelTokenSource, ldapDomain) => {
    try {
      setLoadingGroups(true);
      let response = await accountsActions.getLdapGroupsWithDomainV2(getAccessToken, cancelSource, ldapDomain);

      const groupResponse = response?.data;

      if (Array.isArray(groupResponse) && groupResponse.length > 0) {
        let filteredGroups = [];

        groupResponse.map((group) => {
          let groupType = group.groupType.toLowerCase();
          if (groupType !== "role" && groupType !== "dept") {
            filteredGroups.push(group);
          }
        });

        setGroupList(filteredGroups);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    } finally {
      setLoadingGroups(false);
    }
  };

  const getLdapUsers = async (cancelSource = cancelTokenSource, ldapDomain) => {
    try {
      setLoadingUsers(true);
      const response = await accountsActions.getLdapUsersWithDomainV2(getAccessToken, cancelSource, ldapDomain);

      if (response?.data) {
        setUserList(response.data);
      }

    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const unpackData = () => {
    let currentData = dataObject.getData(fieldName);
    let unpackedRoles = [];

    if (Array.isArray(currentData) && currentData.length > 0)
    {
      currentData.map((item) => {
        unpackedRoles.push(
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
      unpackedRoles.push({role: "", user: "", group: "", roleAccessType: "group"});
    }

    setRoles([...unpackedRoles]);
  };

  const validateAndSetData = (newRoleList) => {
    setRoles([...newRoleList]);
    let newDataObject = {...dataObject};

    if (newRoleList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of role access items. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newRoleList && newRoleList.length > 0) {
      newRoleList.map((item) => {
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
  };

  const isRoleComplete = (role) => {
    return !(role?.role === "" || (role?.user === "" && role?.group === ""));
  };

  const lastRoleComplete = () => {
    let newPropertyList = roles;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return isRoleComplete(lastObject);
  };

  const addRole = () => {
    let newRoleList = roles;

    if (lastRoleComplete()) {
      let newRow = {role: "", user: "", group: "", roleAccessType: "group"};
      newRoleList.push(newRow);
      validateAndSetData(newRoleList);
    }
  };

  const deleteRole = (index) => {
    let newRoleList = roles;
    newRoleList.splice(index, 1);
    validateAndSetData(newRoleList);
  };

  const updateProperty = (row, innerField, newValue) => {
    let newPropertyList = roles;
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

  const getDisabledUsers = () => {
    if (roles.length > 0) {
      const disabledUsers = [];

      roles.map((property) => {
        if (property.user != null && property.user !== "") {
          disabledUsers.push(property.user);
        }
      });

      return disabledUsers;
    }
  };

  const getDisabledGroups = () => {
    if (roles.length > 0) {
      const disabledGroups = [];

      roles.map((property) => {
        if (property.group != null && property.group !== "") {
          disabledGroups.push(property.group);
        }
      });

      return disabledGroups;
    }
  };

  const getTypeInput = (role, index) => {
    return (
      <div className="mt-2 w-100 d-flex">
        <div className="ml-auto">
          <input
            className="mx-2"
            type="radio"
            name={`roleAccessType-${index}`}
            value={"group"}
            checked={role["roleAccessType"] === "group"}
            onChange={() => updateProperty(role, "roleAccessType", "group")}/>Group
        </div>
        <div className="mr-auto">
          <input
            className="mx-2"
            type="radio"
            name={`roleAccessType-${index}`}
            value={"user"}
            checked={role["roleAccessType"] === "user"}
            onChange={() => updateProperty(role, "roleAccessType", "user")}/>User
        </div>
      </div>
    );
  };

  const getAssigneeInput = (role) => {
    if (role["roleAccessType"] === "user") {
      return (
        <DropdownList
          data={userList}
          valueField={"emailAddress"}
          textField={(item) => item != null && typeof item === "object" ? `${item.name} (${item.emailAddress})` : item}
          value={role["user"]}
          busy={loadingUsers}
          filter={"contains"}
          disabled={getDisabledUsers()}
          placeholder={"Select A User"}
          onChange={(value) => updateProperty(role, "user", value["emailAddress"])}
        />
      );
    }

    return (
      <DropdownList
        data={groupList}
        valueField={"name"}
        textField={"name"}
        value={role["group"]}
        busy={loadingGroups}
        disabled={getDisabledGroups()}
        filter={"contains"}
        placeholder={"Select A Group"}
        onChange={(value) => updateProperty(role, "group", value["name"])}
      />
    );
  };

  const getRoleTypeInput = (role) => {
    return (
      <DropdownList
        className=""
        data={roleTypes}
        valueField={"value"}
        textField={"text"}
        value={role["role"]}
        filter={"contains"}
        placeholder={"Select Role Type"}
        onChange={(value) => updateProperty(role, "role", value["value"])}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteRole(index)}>
        <span><FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/></span>
      </Button>
    );
  };

  const getPropertyRow = (role, index) => {
    return (
      <div className="d-flex my-2" key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={2}>
              {getTypeInput(role, index)}
            </Col>
            <Col sm={5} className={"pl-1 pr-0"}>
              {getAssigneeInput(role)}
            </Col>
            <Col sm={5} className={"pl-2 pr-1"}>
              {getRoleTypeInput(role)}
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
    if (!roles || roles.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted no-data-message">No access roles have been added yet.</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {roles.map((property, index) => {
          return getPropertyRow(property, index);
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <div className={"mr-auto ml-3 mt-1"}>
          {/*<span className="text-muted ml-5">Type</span>*/}
        </div>
        <div className={"mr-auto mt-1"}>
          <span className="text-muted">Assignee</span>
        </div>
        <div className={"mr-auto mt-1"}>
          <span className="text-muted">Access Type</span>
        </div>
        <div />
      </div>
    );
  };

  const getIncompleteRoleMessage = () => {
    if (!lastRoleComplete()) {
      return (
        <div className="w-100 pr-3 mb-1 text-muted small text-right">
          <FontAwesomeIcon className="text-warning mr-1" icon={faExclamationTriangle} fixedWidth />
          <span className="mt-1">Incomplete Roles Will Be Removed Upon Saving</span>
        </div>
      );
    }
  };

  if (field == null) {
    return <></>;
  }

  return (
    <PropertyInputContainer
      titleIcon={faIdCard}
      field={field}
      addProperty={addRole}
      titleText={"Roles"}
      errorMessage={errorMessage}
      type={"Role"}
      addAllowed={lastRoleComplete()}
      helpComponent={<RoleAccessEditorHelpOverlayContainer />}
    >
      <div>
        {getHeaderBar()}
      </div>
      <div className="properties-body-alt">
        {getFieldBody()}
      </div>
      {getIncompleteRoleMessage()}
    </PropertyInputContainer>
  );
}

RoleAccessInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
};

export default RoleAccessInput;