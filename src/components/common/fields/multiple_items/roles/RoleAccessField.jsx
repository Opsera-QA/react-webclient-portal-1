import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";
import VanityInlineError from "temp-library-components/fields/info/VanityInlineError";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import VanityInlineWarning from "temp-library-components/fields/info/VanityInlineWarning";
import useGetUserById from "components/user/hooks/useGetUserById";

function RoleAccessField({model, fieldName, noDataMessage, className}) {
  const field = model?.getFieldById(fieldName);
  const currentData = model?.getCurrentData();
  const {
    user,
  } = useGetUserById(model?.getData("owner"));

  const getDisplayer = () => {
    if (ObjectAccessRoleHelper.doesObjectHaveRbacApplied(currentData) !== true) {
      return (
        <VanityInlineError
          className={"my-auto"}
          text={`Warning, this ${model.getType()} does not have Access Roles applied, so anyone can see and use it.`}
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
      <AccessRoleDisplayer
        roles={model?.getArrayData(fieldName)}
        noDataMessage={noDataMessage}
      />
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"d-flex"}>
        <div>
          <FieldLabel
            fieldName={fieldName}
            field={field}
          />
        </div>
        {getDisplayer()}
      </div>
    </FieldContainer>
  );
}

RoleAccessField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  noDataMessage: PropTypes.any,
  className: PropTypes.string
};

export default RoleAccessField;