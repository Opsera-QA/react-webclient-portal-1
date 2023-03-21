import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import LdapUsersTable from "components/admin/accounts/ldap/users/LdapUsersTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function LdapUserManagement() {
  const {orgDomain} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const {
    isOpseraAdministrator,
    accessRoleData,
    toastContext,
    getAccessToken,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [orgDomain]);

  const loadData = async () => {
    try {
      setUserList([]);

      if (isOpseraAdministrator === true) {
        setIsLoading(true);
        await getUsersByDomain();
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUsersByDomain = async () => {
      const response = await accountsActions.getOrganizationAccountByDomainV2(getAccessToken, cancelTokenSource, ldapDomain);
      const parsedUsers = DataParsingHelper.parseNestedArray(response, "data.users");

      if (isMounted?.current === true && parsedUsers) {
        setUserList([...parsedUsers]);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapUserManagement"}
      isLoading={!accessRoleData}
    >
      <LdapUsersTable
        orgDomain={orgDomain}
        isLoading={isLoading}
        userData={userList}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}
