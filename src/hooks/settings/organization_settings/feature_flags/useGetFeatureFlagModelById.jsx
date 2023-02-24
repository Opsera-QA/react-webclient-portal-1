import { useEffect, useState } from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useFeatureFlagActions from "hooks/settings/organization_settings/policies/useFeatureFlagActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModel";
import useFeatureFlagAdministrationActions
  from "hooks/settings/organization_settings/feature_flags/useFeatureFlagAdministrationActions";

export default function useGetFeatureFlagModelById(
  featureFlagId,
) {
  const [featureFlagModel, setFeatureFlagModel] = useState(undefined);
  const { getFeatureFlagModel } = useGetFeatureFlagModel();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const featureFlagAdministrationActions = useFeatureFlagAdministrationActions();

  useEffect(() => {
    setFeatureFlagModel(undefined);

    if (isMongoDbId(featureFlagId) === true) {
      loadData(getFeatureFlag).catch(() => {
      });
    }
  }, [featureFlagId]);

  const getFeatureFlag = async () => {
    const response = await featureFlagAdministrationActions.getFeatureFlagById(
      featureFlagId,
    );

    const featureFlag = DataParsingHelper.parseNestedObject(response, "data.data");

    if (featureFlag) {
      const newModel = getFeatureFlagModel(
        featureFlag,
        false,
      );
      setFeatureFlagModel({ ...newModel });
    }
  };

  return ({
    featureFlagModel: featureFlagModel,
    setFeatureFlagModel: setFeatureFlagModel,
    error: error,
    setError: setError,
    loadData: () => loadData(getFeatureFlag),
    isLoading: isLoading,
  });
}
