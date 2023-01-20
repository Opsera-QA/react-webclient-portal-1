import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import useComponentStateReference from "hooks/useComponentStateReference";
import accountsActions from "components/admin/accounts/accounts-actions";

function LdapOrganizationSelectInput(
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
  const [organizations, setOrganizations] = useState([]);
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
      await getLdapOrganizations();
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

  const getLdapOrganizations = async () => {
    const response = await accountsActions.getOrganizationsV2(getAccessToken, cancelTokenSource);
    const organizationList = response?.data;

    if (isMounted?.current === true && Array.isArray(organizationList)) {
      setOrganizations(organizationList);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={organizations}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      disabled={disabled || isLoading}
    />
  );
}

LdapOrganizationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

LdapOrganizationSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
};

export default LdapOrganizationSelectInput;