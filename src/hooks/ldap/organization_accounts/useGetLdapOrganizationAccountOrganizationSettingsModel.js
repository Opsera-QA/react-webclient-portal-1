import { useEffect, useState } from "react";
import useGetLdapOrganizationAccountOrganizationSettings
  from "hooks/ldap/organization_accounts/useGetLdapOrganizationAccountOrganizationSettings";
import OrganizationSettingsModel from "components/admin/organization_settings/organizationSettings.model";

export default function useGetLdapOrganizationAccountOrganizationSettingsModel(
  organizationDomain,
  organizationAccountName,
  handleErrorFunction,
  ) {
  const [organizationSettingsModel, setOrganizationSettingsModel] = useState(undefined);
  const {
    organizationSettings,
    error,
    isLoading,
    loadData,
  } = useGetLdapOrganizationAccountOrganizationSettings(
    organizationDomain,
    organizationAccountName,
    handleErrorFunction,
  );

  useEffect(() => {
    setOrganizationSettingsModel(undefined);

    if (organizationSettings) {
      setOrganizationSettingsModel({...new OrganizationSettingsModel(organizationSettings, false)});
    }
  }, [organizationSettings]);

  return ({
    organizationSettingsModel: organizationSettingsModel,
    setOrganizationSettingsModel: setOrganizationSettingsModel,
    error: error,
    loadData: loadData,
    isLoading: isLoading,
  });
}
