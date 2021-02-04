import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import DtoFilterSelectInput from "components/common/filters/input/DtoFilterSelectInput";
import accountsActions from "components/admin/accounts/accounts-actions";

function LdapOwnerFilter({ filterDto, setFilterDto }) {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const user = await getUserRecord();
      const {ldap} = user;
      setUser(user);
      const userRoleAccess = await setAccessRoles(user);
      setAccessRoleData(userRoleAccess)

      if (userRoleAccess && userRoleAccess?.Type !== "sass-user" && ldap.domain != null)
      {
        await getUsers(ldap);
      }
    }
    catch (error) {
      toastContext.showErrorDialog(error,"Could not load users.");
    }
    finally {
      setIsLoading(false);
    }
  }

  const getUsers = async (ldap) => {
    let response = await accountsActions.getAccountUsers(getAccessToken);
    let userOptions = [];
    const parsedUsers = response?.data;

    if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
      parsedUsers.map((user, index) => {
        userOptions.push({text: `Owner: ${user.firstName} ${user.lastName}`, value:`${user._id}`});
      });
    }

    setUserOptions(userOptions);
  };

  if (user == null || user.ldap?.domain == null || accessRoleData == null || accessRoleData?.Type === "sass-user") {
    return <></>
  }


  return (
    <DtoFilterSelectInput
      fieldName={"owner"}
      busy={isLoading}
      placeholderText={"Filter by Owner"}
      setDataObject={setFilterDto}
      dataObject={filterDto}
      selectOptions={userOptions}
    />
  );
}


LdapOwnerFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default LdapOwnerFilter;


