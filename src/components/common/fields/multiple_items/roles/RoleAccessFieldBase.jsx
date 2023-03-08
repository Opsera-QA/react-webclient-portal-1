import React from "react";
import PropTypes from "prop-types";
import AccessRoleDisplayerField from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayerField";
import VanityInlineError from "temp-library-components/fields/info/VanityInlineError";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import VanityInlineWarning from "temp-library-components/fields/info/VanityInlineWarning";
import useGetUserById from "components/user/hooks/useGetUserById";
import IconBase from "components/common/icons/IconBase";
import {faLock, faUnlock} from "@fortawesome/pro-light-svg-icons";
import EditIcon from "components/common/icons/field/EditIcon";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";

function RoleAccessFieldBase(
  {
    model,
    fieldName,
    noDataMessage,
    className,
    handleEditFunction,
    disabled,
    helpComponent,
  }) {
  const field = model?.getFieldById(fieldName);
  const currentData = model?.getCurrentData();
  const {
    user,
  } = useGetUserById(model?.getData("owner"));

  const getIcon = () => {
    if (ObjectAccessRoleHelper.doesObjectHaveRbacApplied(currentData) !== true) {
      return (
        <IconBase
          className={"ml-2 danger-red"}
          icon={faUnlock}
          onClickFunction={disabled !== true ? handleEditFunction : undefined}
        />
      );
    }

    if (ObjectAccessRoleHelper.doesOnlyOwnerHaveAccessToObject(user?.email, currentData) === true) {
      return (
        <IconBase
          className={"ml-2 opsera-primary"}
          icon={faLock}
          onClickFunction={disabled !== true ? handleEditFunction : undefined}
        />
      );
    }

    return (
      <IconBase
        className={"ml-2 opsera-primary"}
        icon={faLock}
        onClickFunction={handleEditFunction}
      />
    );
  };

  const getDisplayer = () => {
    if (ObjectAccessRoleHelper.doesObjectHaveRbacApplied(currentData) !== true) {
      return (
        <VanityInlineError
          className={"my-auto"}
          text={`Warning, this ${model.getType()} does not have Access Rules applied, so anyone can see and use it.`}
        />
      );
    }

    if (ObjectAccessRoleHelper.doesOnlyOwnerHaveAccessToObject(user?.email, currentData) === true) {
      return (
        <VanityInlineWarning
          className={"my-auto"}
          text={`Warning, only the owner ${user?.firstName} ${user?.lastName} (${user?.email}) has access to this ${model.getType()}. Please adjust access rules if this ${model.getType()} is to be used by others.`}
        />
      );
    }

    return (
      <AccessRoleDisplayerField
        roles={model?.getArrayData(fieldName)}
        noDataMessage={noDataMessage}
        item={model?.getCurrentData()}
        handleEditFunction={disabled !== true ? handleEditFunction : undefined}
      />
    );
  };

  if (field == null || currentData == null) {
    return null;
  }

  return (
    <div>
      <div className={"d-flex"}>
        <div className={"mb-1 text-muted"}>
          {field?.label}
        </div>
        {getIcon()}
        <EditIcon
          className={"ml-2 text-muted"}
          handleEditFunction={handleEditFunction}
          disabled={disabled}
          tooltipBody={"Edit Access Rules"}
          iconSize={"sm"}
        />
        <LaunchHelpIcon
          visible={disabled !== true}
          helpComponent={helpComponent}
          className={"ml-2 text-muted"}
        />
      </div>
      <div className={"d-flex"}>
        {getDisplayer()}
      </div>
    </div>
  );
}

RoleAccessFieldBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  noDataMessage: PropTypes.any,
  className: PropTypes.string,
  handleEditFunction: PropTypes.func,
  disabled: PropTypes.bool,
  helpComponent: PropTypes.object,
};

RoleAccessFieldBase.defaultProps = {
  fieldName: "roles",
};

export default RoleAccessFieldBase;