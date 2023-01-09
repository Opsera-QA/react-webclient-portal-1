import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faPlus,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import AccessControlRoleSelectInput from "components/common/inputs/roles/type/AccessControlRoleSelectInput";
import RoleAccessInputLdapUserSelectInput
  from "components/common/inputs/roles/users/RoleAccessInputLdapUserSelectInput";
import RoleAccessInputLdapGroupSelectInput
  from "components/common/inputs/roles/groups/RoleAccessInputLdapGroupSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import RoleAccessInputSiteRoleSelectInput
  from "components/common/inputs/roles/site_roles/RoleAccessInputSiteRoleSelectInput";

export default function RoleAccessInputRow(
  {
    disabled,
    roles,
    addRoleFunction,
    accessRuleModel,
    setAccessRuleModel,
  }) {
  const [errorMessage, setErrorMessage] = useState("");

  const getTypeInput = () => {
    return (
      <div className="mt-2 d-inline-flex">
        <div className="m-auto mr-2">
          <input
            className={"mr-2"}
            type={"radio"}
            name={`type`}
            value={"group"}
            checked={accessRuleModel?.getType() === "group"}
            disabled={disabled}
            onChange={() => {
              accessRuleModel?.setData("type", "group");
              accessRuleModel?.setDefaultValue("user");
              accessRuleModel?.setDefaultValue("site_role");
              setAccessRuleModel({...accessRuleModel});
            }}
          />
          <span className={"mr-2"}>Group</span>
        </div>
        <div className="m-auto mx-2">
          <input
            className={"mr-2"}
            type={"radio"}
            name={`type`}
            disabled={disabled}
            value={"user"}
            checked={accessRuleModel?.getType() === "user"}
            onChange={() => {
              accessRuleModel?.setData("type", "user");
              accessRuleModel?.setDefaultValue("group");
              accessRuleModel?.setDefaultValue("site_role");
              setAccessRuleModel({...accessRuleModel});
            }}
          />
          <span>User</span>
        </div>
        <div className="m-auto mx-2">
          <input
            className={"mr-2"}
            type={"radio"}
            name={`type`}
            disabled={disabled}
            value={"role"}
            checked={accessRuleModel?.getType() === "role"}
            onChange={() => {
              accessRuleModel?.setData("type", "site_role");
              accessRuleModel?.setDefaultValue("group");
              accessRuleModel?.setDefaultValue("user");
              setAccessRuleModel({...accessRuleModel});
            }}
          />
          <span>Role</span>
        </div>
      </div>
    );
  };

  const getButtonTypeInput = () => {
    return (
      <div className={"my-2"}>
        <InputLabel
          field={accessRuleModel?.getFieldById("type")}
        />
        <div className={"d-flex h-100"}>
          <div className={"d-flex"}>
            <Button
              name={`type-group`}
              className={"mr-2"}
              variant={accessRuleModel?.getType() === "group" ? "primary" : "outline-primary"}
              onClick={() => {
                accessRuleModel?.setData("type", "group");
                accessRuleModel?.setDefaultValue("user");
                accessRuleModel?.setDefaultValue("site_role");
                setAccessRuleModel({...accessRuleModel});
              }}
            >
              Group
            </Button>
            <Button
              variant={accessRuleModel?.getType() === "user" ? "primary" : "outline-primary"}
              name={`type-user`}
              className={"mr-2"}
              onClick={() => {
                accessRuleModel?.setData("type", "user");
                accessRuleModel?.setDefaultValue("group");
                accessRuleModel?.setDefaultValue("site_role");
                setAccessRuleModel({...accessRuleModel});
              }}
            >
              User
            </Button>
            <Button
              variant={accessRuleModel?.getType() === "site_role" ? "primary" : "outline-primary"}
              name={`type-site_role`}
              className={"mr-2"}
              onClick={() => {
                accessRuleModel?.setData("type", "site_role");
                accessRuleModel?.setDefaultValue("group");
                accessRuleModel?.setDefaultValue("user");
                setAccessRuleModel({...accessRuleModel});
              }}
            >
              Role
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const getAssigneeInput = () => {
    const type = accessRuleModel?.getType();

    switch (type) {
      case "user":
        return (
          <RoleAccessInputLdapUserSelectInput
            model={accessRuleModel}
            setModel={setAccessRuleModel}
            roles={roles}
            disabled={disabled}
          />
        );
      case "group":
        return (
          <RoleAccessInputLdapGroupSelectInput
            model={accessRuleModel}
            setModel={setAccessRuleModel}
            roles={roles}
            disabled={disabled}
          />
        );
      case "site_role":
        return (
          <RoleAccessInputSiteRoleSelectInput
            model={accessRuleModel}
            setModel={setAccessRuleModel}
            roles={roles}
            disabled={disabled}
          />
        );
    }
  };

  if (accessRuleModel == null) {
    return null;
  }

  return (
    <div className={"mx-3 mb-3"}>
      <Row>
        <Col sm={11}>
          <Row>
            <Col sm={4}>
              {getButtonTypeInput()}
            </Col>
            <Col sm={4}>
              {getAssigneeInput()}
            </Col>
            <Col sm={4}>
              <AccessControlRoleSelectInput
                model={accessRuleModel}
                setModel={setAccessRuleModel}
                disabled={disabled}
                fieldName={"role"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <ButtonContainerBase>
        <VanityButtonBase
          onClickFunction={addRoleFunction}
          normalText={"Add Role"}
          buttonSize={"sm"}
          variant={"secondary"}
          disabled={disabled || accessRuleModel?.checkCurrentValidity() !== true}
          icon={faPlus}
        />
      </ButtonContainerBase>
    </div>
  );
}

RoleAccessInputRow.propTypes = {
  accessRuleModel: PropTypes.object,
  setAccessRuleModel: PropTypes.func,
  disabled: PropTypes.bool,
  addRoleFunction: PropTypes.func,
  roles: PropTypes.array,
};