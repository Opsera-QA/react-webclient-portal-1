import FeatureFlagModel from "components/admin/organization_settings/details/features/featureFlag.model";

export default function useGetFeatureFlagModel() {
  const getFeatureFlagModel = (
    policy,
    isNew,
  ) => {
    return new FeatureFlagModel(
      policy,
      isNew,
    );
  };

  return ({
    getFeatureFlagModel: getFeatureFlagModel,
  });
}
