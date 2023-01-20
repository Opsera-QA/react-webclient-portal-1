import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetLdapUsersForDomain from "hooks/ldap/users/useGetLdapUsersForDomain";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export default function RoleAccessInputLdapUserSelectInput(
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
    users,
    isLoading,
    error,
  } = useGetLdapUsersForDomain(
    DataParsingHelper.parseNestedString(userData, "ldap.domain"),
  );

  const getDisabledUsers = () => {
    const userList = DataParsingHelper.parseArray(users, []);

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
      selectOptions={users}
      valueField={"emailAddress"}
      textField={(user) => user != null && typeof user === "object" ? `${user.name} (${user.emailAddress})` : user}
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
