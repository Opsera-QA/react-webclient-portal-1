import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import PropType from "prop-types";
import useGetUserById from "components/user/hooks/useGetUserById";
import VanityInlineWarning from "temp-library-components/fields/info/VanityInlineWarning";
import VanityInlineError from "temp-library-components/fields/info/VanityInlineError";

export default function RbacWarningField({ model }) {
  const currentData = model?.getCurrentData();
  const {
    isSassUser,
  } = useComponentStateReference();
  const {
    user,
  } = useGetUserById(model?.getData("owner"));

  if (isSassUser !== false) {
    return null;
  }

  if (ObjectAccessRoleHelper.doesObjectHaveRbacApplied(currentData) !== true) {
    return (
      <VanityInlineError
        className={"my-2"}
        text={`Warning, this ${model.getType()} does not have Access Roles applied, so anyone can see and use it.`}
      />
    );
  }

  if (ObjectAccessRoleHelper.doesOnlyOwnerHaveAccessToObject(user?.email, currentData) === true) {
    return (
      <VanityInlineWarning
        className={"my-2"}
        text={`Warning, only the owner ${user?.firstName} ${user?.lastName} (${user?.email}) has access to this ${model.getType()}. Please adjust access rules if this ${model.getType()} is to be used by others.`}
      />
    );
  }

  return null;
}

RbacWarningField.propTypes = {
  model: PropType.object,
};