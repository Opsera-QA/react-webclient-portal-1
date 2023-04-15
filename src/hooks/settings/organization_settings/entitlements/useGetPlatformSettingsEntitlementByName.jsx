import {useContext, useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {AuthContext} from "contexts/AuthContext";

export default function useGetPlatformSettingsEntitlementByName(
  name,
) {
  const [platformSettingsEntitlement, setPlatformSettingsEntitlement] = useState(undefined);
  const { platformSettingsRecord, isLoadingPlatformSettingsRecord } = useContext(AuthContext);

  useEffect(() => {
    setPlatformSettingsEntitlement(undefined);

    if (hasStringValue(name) === true) {
      const entitlements = DataParsingHelper.parseNestedObject(platformSettingsRecord, "entitlements", []);
      const foundEntitlement = DataParsingHelper.parseObject(entitlements.find((entitlement) => entitlement?.name === name));

      if (foundEntitlement) {
        setPlatformSettingsEntitlement({...foundEntitlement});
      }
    }
  }, [name, platformSettingsRecord]);

  return ({
    platformSettingsEntitlement: platformSettingsEntitlement,
    setPlatformSettingsEntitlement: setPlatformSettingsEntitlement,
    isLoading: isLoadingPlatformSettingsRecord,
    isActive: platformSettingsEntitlement?.active === true,
  });
}
