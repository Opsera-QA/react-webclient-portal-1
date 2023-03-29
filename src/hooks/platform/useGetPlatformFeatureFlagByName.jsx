import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetPlatformFeatureFlags from "hooks/platform/useGetPlatformFeatureFlags";

export default function useGetPlatformFeatureFlagByName(featureFlagName) {
  const { featureFlags } = useGetPlatformFeatureFlags();
  const parsedFeatureFlags = DataParsingHelper.parseObject(featureFlags, {});
  const parsedFeatureFlagName = DataParsingHelper.parseString(featureFlagName);

  if (!parsedFeatureFlagName) {
    return null;
  }

  return DataParsingHelper.safeObjectPropertyParser(parsedFeatureFlags, parsedFeatureFlagName);
}
