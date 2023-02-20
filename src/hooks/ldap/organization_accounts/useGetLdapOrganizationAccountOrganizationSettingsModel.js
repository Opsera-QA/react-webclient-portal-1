import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLdapOrganizationAccountActions from "hooks/ldap/organization_accounts/useLdapOrganizationAccountActions";
import useGetLdapOrganizationAccountOrganizationSettings
  from "hooks/ldap/organization_accounts/useGetLdapOrganizationAccountOrganizationSettings";
import modelHelpers from "components/common/model/modelHelpers";
import organizationSettingsMetadata
  from "@opsera/definitions/constants/settings/organization-settings/organizationSettings.metadata";

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
      setOrganizationSettingsModel({...modelHelpers.parseObjectIntoModel(organizationSettings, organizationSettingsMetadata)});
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
