import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLdapOrganizationAccountActions from "hooks/ldap/organization_accounts/useLdapOrganizationAccountActions";

export default function useGetLdapOrganizationAccountOrganizationSettings(
  organizationDomain,
  organizationAccountName,
  handleErrorFunction,
  ) {
  const [organizationSettings, setOrganizationSettings] = useState(undefined);
  const ldapOrganizationAccountActions = useLdapOrganizationAccountActions();
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setOrganizationSettings(undefined);

    if (
      isOpseraAdministrator !== true
      || hasStringValue(organizationDomain) === true
      || hasStringValue(organizationAccountName) === true
    ) {
      loadData(getLdapOrganizationAccountOrganizationSettings, handleErrorFunction).catch(() => {
      });
    }
  }, [isOpseraAdministrator, organizationDomain, organizationAccountName]);

  const getLdapOrganizationAccountOrganizationSettings = async () => {
    if (
      isOpseraAdministrator !== true
      || hasStringValue(organizationDomain) !== true
      || hasStringValue(organizationAccountName) !== true
    ) {
      return;
    }

    const response = await ldapOrganizationAccountActions.getOrganizationSettingsForOrganizationAccount(
      organizationDomain,
      organizationAccountName,
    );
    const newOrganizationSettings = DataParsingHelper.parseNestedObject(response, "data.data");

    if (newOrganizationSettings) {
      setOrganizationSettings(newOrganizationSettings);
    }
  };

  return ({
    organizationSettings: organizationSettings,
    setOrganizationSettings: setOrganizationSettings,
    error: error,
    loadData: () => loadData(getLdapOrganizationAccountOrganizationSettings, handleErrorFunction),
    isLoading: isLoading,
  });
}
