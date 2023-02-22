import { useState } from "react";
import useGetFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModel";

export default function useGetNewFeatureFlagModel() {
  const { getFeatureFlagModel } = useGetFeatureFlagModel();
  const [featureFlagModel, setFeatureFlagModel] = useState(getFeatureFlagModel(undefined, true));

  return ({
    featureFlagModel: featureFlagModel,
    setFeatureFlagModel: setFeatureFlagModel,
  });
}
