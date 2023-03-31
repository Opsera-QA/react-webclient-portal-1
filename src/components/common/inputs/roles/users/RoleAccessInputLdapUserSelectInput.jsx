import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetLdapUsers from "hooks/ldap/users/useGetLdapUsers";

export default function RoleAccessInputLdapUserSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    roles,
  }) {
  const {
    ldapUsers,
    isLoading,
    error,
  } = useGetLdapUsers();

  const getDisabledUsers = () => {
    const userList = DataParsingHelper.parseArray(ldapUsers, []);

    if (roles.length > 0) {
      const disabledUsers = [];

      roles.forEach((role) => {
        const emailAddress = DataParsingHelper.parseEmailAddress(role?.user);

        if (emailAddress) {
          const foundUser = userList?.find((user) => user?.emailAddress === emailAddress);

          if (foundUser) {
            disabledUsers.push(foundUser);
          }
        }
      });

      return disabledUsers;
    }
  };

  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      selectOptions={ldapUsers}
      valueField={"emailAddress"}
      textField={"text"}
      busy={isLoading}
      disabled={disabled || getDisabledUsers()}
      error={error}
    />
  );
}

RoleAccessInputLdapUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  roles: PropTypes.array,
};

RoleAccessInputLdapUserSelectInput.defaultProps = {
  fieldName: "user",
};
