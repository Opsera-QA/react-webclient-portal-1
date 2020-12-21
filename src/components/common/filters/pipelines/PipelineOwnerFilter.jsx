import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import DtoFilterSelectInput from "../input/DtoFilterSelectInput";
import {AuthContext} from "../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {getUsersByDomain} from "../../../settings/ldap_users/user-functions";

function PipelineOwnerFilter({ filterDto, setFilterDto }) {
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

      if (userRoleAccess.Type !== "sass-user" && ldap.domain != null)
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
    let users = await getUsersByDomain(ldap.domain, getAccessToken);
    let userOptions = [];

    if (users && users.length > 0) {
      users.map((user, index) => {
        userOptions.push({text: `Pipeline Owner: ${user["firstName"]} ${user["lastName"]}`, value:`${user["emailAddress"]}`});
      });
    }

    setUserOptions(userOptions);
  };

  if (user == null || user.ldap?.domain == null || accessRoleData == null || accessRoleData?.Type === "sass-user") {
    return <></>
  }


  return (
    <div><DtoFilterSelectInput fieldName={"owner"} busy={isLoading} placeholderText={"Filter by Pipeline Owner"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={userOptions} /></div>
  );
}


PipelineOwnerFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default PipelineOwnerFilter;


