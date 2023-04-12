import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import accountsActions from "components/admin/accounts/accounts-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapUserByDomainSelectInput(
  {
    model,
    setModel,
    fieldName,
    valueField,
    textField,
    showClearValueButton,
    setDataFunction,
    organizationDomain,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
    isSaasUser,
    domain,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setUsers([]);

      if (isSaasUser !== false) {
        return;
      }

      setIsLoading(true);
        const domainToCheck =
          hasStringValue(organizationDomain) && isOpseraAdministrator === true ? organizationDomain : domain;
        await getUsers(cancelSource, domainToCheck);
    }
    catch (error) {
      setError(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUsers = async (cancelSource = cancelTokenSource, ldapDomain) => {
    const response = await accountsActions.getLdapUsersWithDomainV2(getAccessToken, cancelSource, ldapDomain);
    const users = response?.data?.data;

    if (Array.isArray(users)) {
      let formattedUsers = [];

      users.map((user) => {
        formattedUsers.push({text: `${user.name} (${user.emailAddress})`, value:`${user.emailAddress}`, user: user});
      });

      setUsers(formattedUsers);
    }
  };

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      showClearValueButton={showClearValueButton}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      dataObject={model}
      selectOptions={users}
      singularTopic={"User"}
      pluralTopic={"Users"}
      error={error}
    />
  );
}

LdapUserByDomainSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.string,
  setDataFunction: PropTypes.func,
  organizationDomain: PropTypes.string,
};

LdapUserByDomainSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  showClearValueButton: true,
};

export default LdapUserByDomainSelectInput;


