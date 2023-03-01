import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useLdapOrganizationActions from "hooks/ldap/organizations/useLdapOrganizationActions";

export default function useGetLdapOrganizationAccounts(handleErrorFunction) {
  const [ldapOrganizationAccounts, setLdapOrganizationAccounts] = useState([]);
  const ldapOrganizationActions = useLdapOrganizationActions();
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setLdapOrganizationAccounts([]);

    if (isOpseraAdministrator === true) {
      loadData(getLdapOrganizationAccounts, handleErrorFunction).catch(() => {
      });
    }
  }, [isOpseraAdministrator]);

  const getLdapOrganizationAccounts = async () => {
    if (isOpseraAdministrator !== true) {
      return;
    }

    const response = await ldapOrganizationActions.getLdapOrganizations();
    const ldapOrganizations = DataParsingHelper.parseNestedArray(response, "data", []);
    const ldapOrganizationAccounts = [];

    ldapOrganizations.forEach((organization) => {
      const organizationAccounts = DataParsingHelper.parseNestedArray(organization, "orgAccounts");

      if (organizationAccounts) {
        ldapOrganizationAccounts.push(...organizationAccounts);
      }
    });

    setLdapOrganizationAccounts([...ldapOrganizationAccounts]);
  };

  return ({
    ldapOrganizationAccounts: ldapOrganizationAccounts,
    setLdapOrganizationAccounts: setLdapOrganizationAccounts,
    error: error,
    loadData: () => loadData(getLdapOrganizationAccounts, handleErrorFunction),
    isLoading: isLoading,
  });
}
