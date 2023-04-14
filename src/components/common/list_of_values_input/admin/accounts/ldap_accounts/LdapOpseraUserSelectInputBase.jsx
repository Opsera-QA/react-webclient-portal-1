import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import accountsActions from "components/admin/accounts/accounts-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapOpseraUserSelectInputBase({ model, setDataFunction, fieldName}) {
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getAccessToken,
    toastContext,
    cancelTokenSource,
    isMounted,
    userData,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadOpseraUsers();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadOpseraUsers = async () => {
    const response = await accountsActions.getUsersV2(getAccessToken, cancelTokenSource);
    const users = response?.data?.data;
    const parsedUserNames = [];

    if (isMounted?.current === true && Array.isArray(users) && users.length > 0) {
      users.map(user => {
        if (model.isNew() || isOpseraAdministrator === true || userData?.ldap?.organization === user?.organization) {
          parsedUserNames.push(user);
        }
      });
    }

    if (isMounted?.current === true) {
      setOpseraUsersList(parsedUserNames);
    }
  };

  const getTextField = (value) => {
    const user = opseraUserList?.find((user) => user?.email === value?.email);

    if (isLoading || user == null) {
      return value?.email || value;
    }

    return (`${user?.firstName} ${user?.lastName}: ${user?.email}`);
  };

  return (
    <SelectInputBase
      dataObject={model}
      selectOptions={opseraUserList}
      fieldName={fieldName}
      valueField={"email"}
      textField={getTextField}
      busy={isLoading}
      setDataFunction={setDataFunction}
    />
  );
}

LdapOpseraUserSelectInputBase.propTypes = {
  model: PropTypes.object.isRequired,
  setDataFunction: PropTypes.func.isRequired,
  fieldName: PropTypes.string,
};

LdapOpseraUserSelectInputBase.defaultProps = {
  fieldName: "orgOwnerEmail",
};

export default LdapOpseraUserSelectInputBase;