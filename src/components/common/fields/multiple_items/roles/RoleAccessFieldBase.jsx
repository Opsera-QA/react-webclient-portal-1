import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import AccessRoleDisplayerField from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayerField";
import VanityInlineError from "temp-library-components/fields/info/VanityInlineError";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import VanityInlineWarning from "temp-library-components/fields/info/VanityInlineWarning";
import useGetUserById from "components/user/hooks/useGetUserById";
import IconBase from "components/common/icons/IconBase";
import {faUnlock} from "@fortawesome/pro-light-svg-icons";

function RoleAccessFieldBase({model, fieldName, noDataMessage, className}) {
  const field = model?.getFieldById(fieldName);
  const currentData = model?.getCurrentData();
  const {
    user,
  } = useGetUserById(model?.getData("owner"));

  const getDisplayer = () => {
    if (ObjectAccessRoleHelper.doesObjectHaveRbacApplied(currentData) !== true) {
      return (
        <>
          <IconBase className={"mr-1"} icon={faUnlock} />
          <VanityInlineError
            className={"my-auto"}
            text={`Warning, this ${model.getType()} does not have Access Roles applied, so anyone can see and use it.`}
          />
        </>
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
      />
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"d-flex"}>
      <div>
        <FieldLabel
          fieldName={fieldName}
          field={field}
        />
      </div>
      {getDisplayer()}
    </div>
  );
}

RoleAccessFieldBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  noDataMessage: PropTypes.any,
  className: PropTypes.string
};

RoleAccessFieldBase.defaultProps = {
  fieldName: "roles",
};

export default RoleAccessFieldBase;