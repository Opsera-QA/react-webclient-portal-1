import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import axios from "axios";

function LdapOwnerFilter({ filterDto, setFilterDto, className }) {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const user = await getUserRecord();
      const {ldap} = user;
      setUser(user);
      const userRoleAccess = await setAccessRoles(user);

      if (isMounted.current === true && userRoleAccess) {
        setAccessRoleData(userRoleAccess)

        if (userRoleAccess?.Type !== "sass-user" && ldap?.domain != null) {
          await getUsers(cancelSource);
        }
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        toastContext.showErrorDialog(error,"Could not load users.");
        console.error(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  }

  const getUsers = async (cancelSource = cancelTokenSource) => {
    let response = await accountsActions.getAccountUsersV2(getAccessToken, cancelSource);
    let userOptions = [];
    const parsedUsers = response?.data;

    if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
      parsedUsers.map((user, index) => {
        userOptions.push({text: `Owner: ${user.firstName} ${user.lastName} (${user.email})`, value:`${user._id}`});
      });
    }

    if (isMounted.current === true) {
      setUserOptions(userOptions);
    }
  };

  if (user == null || user.ldap?.domain == null || accessRoleData == null || accessRoleData?.Type === "sass-user") {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"owner"}
        busy={isLoading}
        placeholderText={"Filter by Owner"}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        selectOptions={userOptions}
      />
    </div>
  );
}

LdapOwnerFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string
};

export default LdapOwnerFilter;


