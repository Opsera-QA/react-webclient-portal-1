import {useContext} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {AuthContext} from "contexts/AuthContext";

export default function useGetPlatformFeatureFlags() {
  const { featureFlags } = useContext(AuthContext);
  return ({
    featureFlags: featureFlags,
    enabledServices: DataParsingHelper.parseObject(featureFlags?.enabledServices, {}),
    orchestrationFeatureFlags: DataParsingHelper.parseObject(featureFlags?.orchestration, {}),
  });
}
