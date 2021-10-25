import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function LdapOpseraUserSelectInputBase({ model, setDataFunction, fieldName}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord, getAccessRoleData } = useContext(AuthContext);
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadOpseraUsers(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadOpseraUsers = async (cancelSource = cancelTokenSource) => {
    const userRecord = getUserRecord();
    const accessRoleData = getAccessRoleData();
    const response = await accountsActions.getUsersV2(getAccessToken, cancelSource);
    const users = response?.data?.data;
    const parsedUserNames = [];

    if (isMounted?.current === true && Array.isArray(users) && users.length > 0) {
      users.map(user => {
        if (model.isNew() || accessRoleData?.OpseraAdministrator === true || userRecord?.ldap?.organization === user?.organization) {
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