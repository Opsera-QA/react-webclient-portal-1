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
import accessControlRuleTypeConstants from "@opsera/know-your-role/constants/accessControlRuleType.constants";

export default function RoleAccessInputRow(
  {
    disabled,
    roles,
    addRoleFunction,
    accessRuleModel,
    setAccessRuleModel,
  }) {
  const [errorMessage, setErrorMessage] = useState("");

  const getButtonTypeInput = () => {
    return (
      <div className={"my-3"}>
        <InputLabel
          field={accessRuleModel?.getFieldById("type")}
        />
        <div className={"d-flex h-100 w-100"}>
          <VanityButtonBase
            className={"mr-2"}
            variant={accessRuleModel?.getType() === accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.GROUP ? "primary" : "outline-primary"}
            onClickFunction={() => {
              accessRuleModel?.setData("type", accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.GROUP);
              accessRuleModel?.setDefaultValue("user");
              accessRuleModel?.setDefaultValue("site_role");
              setAccessRuleModel({...accessRuleModel});
            }}
            normalText={"Group"}
          />
          <VanityButtonBase
            variant={accessRuleModel?.getType() === accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.USER ? "primary" : "outline-primary"}
            name={`type-user`}
            className={"mr-2"}
            onClickFunction={() => {
              accessRuleModel?.setData("type", "user");
              accessRuleModel?.setDefaultValue("group");
              accessRuleModel?.setDefaultValue("site_role");
              setAccessRuleModel({...accessRuleModel});
            }}
            normalText={"User"}
          />
          <VanityButtonBase
            variant={accessRuleModel?.getType() === accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.SITE_ROLE ? "primary" : "outline-primary"}
            name={`type-site_role`}
            className={"mr-2"}
            onClickFunction={() => {
              accessRuleModel?.setData("type", "site_role");
              accessRuleModel?.setDefaultValue("group");
              accessRuleModel?.setDefaultValue("user");
              setAccessRuleModel({...accessRuleModel});
            }}
            normalText={"Site Role"}
          />
        </div>
      </div>
    );
  };

  const getAssigneeInput = () => {
    const type = accessRuleModel?.getType();

    switch (type) {
      case accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.USER:
        return (
          <RoleAccessInputLdapUserSelectInput
            model={accessRuleModel}
            setModel={setAccessRuleModel}
            roles={roles}
            disabled={disabled}
          />
        );
      case accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.GROUP:
        return (
          <RoleAccessInputLdapGroupSelectInput
            model={accessRuleModel}
            setModel={setAccessRuleModel}
            roles={roles}
            disabled={disabled}
          />
        );
      case accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.SITE_ROLE:
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
    <div className={"mx-3 mb-2"}>
      <div>{getButtonTypeInput()}</div>
      <div>{getAssigneeInput()}</div>
      <div>
        <AccessControlRoleSelectInput
          model={accessRuleModel}
          setModel={setAccessRuleModel}
          disabled={disabled}
          fieldName={"role"}
        />
      </div>
      <ButtonContainerBase className={"my-3"}>
        <VanityButtonBase
          onClickFunction={addRoleFunction}
          normalText={"Add Role"}
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