import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetLdapGroupsForDomain from "hooks/ldap/groups/useGetLdapGroupsForDomain";

export default function RoleAccessInputLdapGroupSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    roles,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const {
    groups,
    isLoading,
    error,
  } = useGetLdapGroupsForDomain(
    DataParsingHelper.parseNestedString(userData, "ldap.domain"),
  );

  const getDisabledGroups = () => {
    const groupList = DataParsingHelper.parseArray(groups, []);

    if (roles.length > 0) {
      const disabledGroups = [];

      roles.forEach((role) => {
        const groupName = DataParsingHelper.parseString(role?.group);

        if (groupName) {
          const foundGroup = groupList?.find((group) => group?.name === groupName);

          if (foundGroup) {
            disabledGroups.push(foundGroup);
          }
        }
      });

      return disabledGroups;
    }
  };

  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      selectOptions={groups}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled || getDisabledGroups()}
      error={error}
      singularTopic={"Group"}
      pluralTopic={"Groups"}
    />
  );
}

RoleAccessInputLdapGroupSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  roles: PropTypes.array,
};

RoleAccessInputLdapGroupSelectInput.defaultProps = {
  fieldName: "group",
};
