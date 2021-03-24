import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import {getOrganizationList} from "components/admin/accounts/ldap/organizations/organization-functions";
import {useHistory} from "react-router-dom";

function LdapOrganizationSelectInput({ currentOrganizationDomain, location}) {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [organizationList, setOrganizationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess.OpseraAdministrator) {
        try {
          let organizationList = await getOrganizationList(getAccessToken);
          setOrganizationList(organizationList);
        } catch (error) {
          toastContext.showLoadingErrorDialog(error.message);
          console.error(error.message);
        }
      }
    }
  };

  const handleOrganizationChange = async (selectedOption) => {
    history.push(`/settings/${selectedOption.id}/${location}`);
  };

  if (!accessRoleData || !accessRoleData.OpseraAdministrator) {
    return <></>;
  }

  return (
    <div className="custom-select-input">
      <DropdownList
        data={organizationList}
        value={currentOrganizationDomain}
        busy={isLoading}
        filter="contains"
        valueField='id'
        textField='text'
        placeholder="Select an Organization Account"
        groupBy={org => org["groupId"]}
        onChange={handleOrganizationChange}
      />
    </div>
  );
}

LdapOrganizationSelectInput.propTypes = {
  currentOrganizationDomain: PropTypes.string,
  location: PropTypes.string
};

export default LdapOrganizationSelectInput;