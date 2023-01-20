import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  faIdCard,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import InfoText from "components/common/inputs/info_text/InfoText";
import useComponentStateReference from "hooks/useComponentStateReference";
import RoleAccessInputHeaderField from "components/common/inputs/roles/RoleAccessInputHeaderField";
import InfoContainer from "components/common/containers/InfoContainer";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import RoleAccessInputInlineField from "components/common/inputs/roles/RoleAccessInputInlineField";
import RoleAccessInputRow from "components/common/inputs/roles/RoleAccessInputRow";
import RoleParsingHelper from "@opsera/persephone/helpers/data/roles/roleParsing.helper";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import AccessRuleModel from "components/common/inputs/roles/model/accessRule.model";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function RoleAccessInput(
  {
    fieldName,
    model,
    setModel,
    helpComponent,
    disabled,
    visible,
  }) {
  const field = model?.getFieldById(fieldName);
  const [errorMessage, setErrorMessage] = useState("");
  const [accessRuleModel, setAccessRuleModel] = useState(new AccessRuleModel({}, false));
  const {
    isSaasUser,
  } = useComponentStateReference();

  const validateAndSetData = (newRoleList) => {
    const parsedRoleArray = RoleParsingHelper.parseRoleArray(newRoleList);

    if (parsedRoleArray.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of role access items. Please remove one to add another.");
      return false;
    }

    model.setData(fieldName, [...parsedRoleArray]);
    setModel({...model});
    return true;
  };

  const addRoleFunction = () => {
    const newRole = accessRuleModel?.getPersistData();
    const isRoleValid = RoleParsingHelper.isRoleValid(newRole);

    if (!isRoleValid) {
      return;
    }

    const parsedRole = RoleParsingHelper.parseRole(newRole);
    const currentRoles = model?.getArrayData(fieldName);
    currentRoles.push(parsedRole);
    const successfulAdd = validateAndSetData(currentRoles);

    if (successfulAdd === true) {
      accessRuleModel?.resetData();
      setAccessRuleModel({...accessRuleModel});
    }
  };

  const editAccessRoleFunction = (index) => {
    const parsedRole = deleteRoleFunction(index);
    setAccessRuleModel({...new AccessRuleModel(parsedRole, false)});
  };

  const deleteRoleFunction = (index) => {
    const currentRoles = model?.getArrayData(fieldName);
    const deletedRole = currentRoles[index];
    currentRoles.splice(index, 1);
    validateAndSetData(currentRoles);
    return deletedRole;
  };

  const clearRolesArray = () => {
    validateAndSetData([]);
  };

  const getFieldBody = () => {
    const roles = model?.getArrayData(fieldName);

    if (!roles || roles.length === 0) {
      return (
        <div className={"my-3"}>
          <CenteredContentWrapper>
            <div>No access roles have been added yet.</div>
          </CenteredContentWrapper>
          <div className={"mx-3"}>
            <hr/>
          </div>
        </div>
      );
    }

    return (
      <div>
        {roles.map((role, index) => {
          return (
            <div
              key={index}
              // className={`${index % 2 === 0 ? "odd-row" : "even-row"}`}
            >
              <RoleAccessInputInlineField
                accessRule={role}
                deleteAccessRuleFunction={() => deleteRoleFunction(index)}
                editAccessRoleFunction={() => editAccessRoleFunction(index)}
              />
              <div className={"mx-3"}>
                <hr/>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getRolesMessage = () => {
    const roles = model?.getArrayData(fieldName);

    if (!Array.isArray(roles) || roles.length === 0 || (roles.length === 1)) {
      return (`
        If no Roles are assigned, all users will have access. 
        Once a role is applied, only then will access be restricted to the Roles given. 
        All users given roles will have access. 
        All group members will have access, if a group is assigned a role.
      `);
    }

    return (`
      Only the listed users, all members assigned to the listed groups, and Site Administrators have access. 
      In addition, Security Managers and Auditors will have read access if those Site Roles are enabled.
    `);
  };

  const getRolesSubMessage = () => {
    return (`
      Please note, if a user selected above is already a member of the Site Administrators or Site Power Users roles, 
      that privilege will supersede these settings where applicable.
    `);
  };

  const getClearDataButton = () => {
    if (disabled !== true) {
      return (
        <VanityButtonBase
          onClickFunction={clearRolesArray}
          normalText={"Remove All Roles"}
          buttonSize={"sm"}
          className={"mr-2"}
          variant={"danger"}
          disabled={disabled}
          icon={faTrash}
        />
      );
    }
  };

  if (field == null || isSaasUser === true || visible === false) {
    return <></>;
  }

  return (
    <div className={"bg-white"} style={{minWidth: "575px"}}>
      <div className={"mx-2 mb-2"}>
        <InfoText customMessage={getRolesMessage()}/>
      </div>
      <InfoContainer
        titleIcon={faIdCard}
        titleText={"Access Controls"}
        errorMessage={errorMessage}
        helpComponent={helpComponent}
        titleRightSideButton={getClearDataButton()}
      >
        <div>
          <RoleAccessInputHeaderField/>
          {getFieldBody()}
          <H5FieldSubHeader
            className={"mx-3"}
            subheaderText={"Add New Access Control Rule"}
          />
          <RoleAccessInputRow
            accessRuleModel={accessRuleModel}
            setAccessRuleModel={setAccessRuleModel}
            roles={model?.getArrayData(fieldName)}
            disabled={disabled}
            addRoleFunction={addRoleFunction}
          />
        </div>
      </InfoContainer>
      <div className={"mx-2"}>
        <InfoText customMessage={getRolesSubMessage()}/>
      </div>
    </div>
  );
}

RoleAccessInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

RoleAccessInput.defaultProps = {
  fieldName: "roles",
};
