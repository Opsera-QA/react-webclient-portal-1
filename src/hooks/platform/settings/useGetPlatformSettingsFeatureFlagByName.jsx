import {useContext, useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {AuthContext} from "contexts/AuthContext";

export default function useGetPlatformSettingsFeatureFlagByName(
  name,
) {
  const [platformSettingsFeatureFlag, setPlatformSettingsFeatureFlag] = useState(undefined);
  const { platformSettingsRecord } = useContext(AuthContext);

  useEffect(() => {
    setPlatformSettingsFeatureFlag(undefined);

    if (hasStringValue(name) === true) {
      const featureFlags = DataParsingHelper.parseNestedObject(platformSettingsRecord, "features", []);
      const foundFeatureFlag = DataParsingHelper.parseObject(featureFlags.find((featureFlag) => featureFlag?.name === name));

      if (foundFeatureFlag) {
        setPlatformSettingsFeatureFlag({...foundFeatureFlag});
      }
    }
  }, [name, platformSettingsRecord]);

  return ({
    platformSettingsFeatureFlag: platformSettingsFeatureFlag,
    setPlatformSettingsFeatureFlag: setPlatformSettingsFeatureFlag,
  });
}
