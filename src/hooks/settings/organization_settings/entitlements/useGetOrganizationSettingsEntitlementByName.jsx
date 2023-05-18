import {useContext, useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {AuthContext} from "contexts/AuthContext";

export default function useGetOrganizationSettingsEntitlementByName(
  name,
) {
  const [organizationSettingsEntitlement, setOrganizationSettingsEntitlement] = useState(undefined);
  const { organizationSettingsRecord, isLoadingOrganizationSettingsRecord } = useContext(AuthContext);

  useEffect(() => {
    setOrganizationSettingsEntitlement(undefined);

    if (hasStringValue(name) === true) {
      const entitlements = DataParsingHelper.parseNestedObject(organizationSettingsRecord, "entitlements", []);
      const foundEntitlement = DataParsingHelper.parseObject(entitlements.find((entitlement) => entitlement?.name === name));

      if (foundEntitlement) {
        setOrganizationSettingsEntitlement({...foundEntitlement});
      }
    }
  }, [name, organizationSettingsRecord]);

  return ({
    organizationSettingsEntitlement: organizationSettingsEntitlement,
    setOrganizationSettingsEntitlement: setOrganizationSettingsEntitlement,
    isLoading: isLoadingOrganizationSettingsRecord,
    isActive: organizationSettingsEntitlement?.active === true,
  });
}
