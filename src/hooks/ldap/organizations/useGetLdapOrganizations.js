import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useLdapOrganizationActions from "hooks/ldap/organizations/useLdapOrganizationActions";

export default function useGetLdapOrganizations(handleErrorFunction) {
  const [ldapOrganizations, setLdapOrganizations] = useState([]);
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
    setLdapOrganizations([]);

    if (isOpseraAdministrator === true) {
      loadData(getLdapUsersForDomain, handleErrorFunction).catch(() => {
      });
    }
  }, [isOpseraAdministrator]);

  const getLdapUsersForDomain = async () => {
    const response = await ldapOrganizationActions.getLdapOrganizations();
    setLdapOrganizations([...DataParsingHelper.parseNestedArray(response, "data", [])]);
  };

  return ({
    ldapOrganizations: ldapOrganizations,
    setLdapOrganizations: setLdapOrganizations,
    error: error,
    loadData: () => loadData(getLdapUsersForDomain, handleErrorFunction),
    isLoading: isLoading,
  });
}
