import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import useComponentStateReference from "hooks/useComponentStateReference";
import accountsActions from "components/admin/accounts/accounts-actions";

function LdapOrganizationAccountSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [ldapOrganizationAccountList, setLdapOrganizationAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getLdapOrganizationAccounts();
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getLdapOrganizationAccounts = async () => {
    const response = await accountsActions.getOrganizationsV2(getAccessToken, cancelTokenSource);
    const organizations = response?.data;

    if (isMounted?.current === true && Array.isArray(organizations)) {
      const organizationAccounts = [];

      organizations.map(organization => {
        const orgAccounts = organization?.orgAccounts;
        const organizationName = organization?.name;

        if (Array.isArray(orgAccounts) && orgAccounts.length > 0) {
          orgAccounts.map(orgAccount => {
            organizationAccounts.push({
              text: `${orgAccount?.name}: ${orgAccount?.orgDomain}`,
              groupId: organizationName,
              value: orgAccount[valueField]
            });
          });
        }

        setLdapOrganizationAccountList(organizationAccounts);
      });
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={ldapOrganizationAccountList}
      busy={isLoading}
      valueField={valueField}
      error={error}
      groupBy={"groupId"}
      textField={textField}
      disabled={disabled || isLoading}
    />
  );
}

LdapOrganizationAccountSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

LdapOrganizationAccountSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
};

export default LdapOrganizationAccountSelectInput;