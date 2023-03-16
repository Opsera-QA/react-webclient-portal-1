import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useLdapOrganizationActions from "hooks/ldap/organizations/useLdapOrganizationActions";

// TODO: Replace with new call once we make a targeted route for organization accounts
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
      loadData(getLdapOrganizations, handleErrorFunction).catch(() => {
      });
    }
  }, [isOpseraAdministrator]);

  const getLdapOrganizations = async () => {
    if (isOpseraAdministrator !== true) {
      return;
    }

    const response = await ldapOrganizationActions.getLdapOrganizations();
    setLdapOrganizations([...DataParsingHelper.parseNestedArray(response, "data", [])]);
  };

  return ({
    ldapOrganizations: ldapOrganizations,
    setLdapOrganizations: setLdapOrganizations,
    error: error,
    loadData: () => loadData(getLdapOrganizations, handleErrorFunction),
    isLoading: isLoading,
  });
}
