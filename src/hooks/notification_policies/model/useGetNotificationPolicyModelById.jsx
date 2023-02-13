import { useEffect, useState } from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePolicyActions from "hooks/settings/organization_settings/policies/usePolicyActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetNotificationPolicyModel from "hooks/notification_policies/model/useGetNotificationPolicyModel";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";

export default function useGetNotificationPolicyModelById(
  policyId,
) {
  const [notificationPolicyModel, setNotificationPolicyModel] = useState(undefined);
  const { getNotificationPolicyModel } = useGetNotificationPolicyModel();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const notificationPolicyActions = useNotificationPolicyActions();

  useEffect(() => {
    setNotificationPolicyModel(undefined);

    if (isMongoDbId(policyId) === true) {
      loadData(getPolicy).catch(() => {
      });
    }
  }, [policyId]);

  const getPolicy = async () => {
    const response = await notificationPolicyActions.getNotificationPolicyById(
      policyId,
    );

    const newNotificationPolicy = DataParsingHelper.parseNestedObject(response, "data.data");

    if (newNotificationPolicy) {
      const newModel = getNotificationPolicyModel(
        newNotificationPolicy,
        false,
      );
      setNotificationPolicyModel({ ...newModel });
    }
  };

  return ({
    notificationPolicyModel: notificationPolicyModel,
    setNotificationPolicyModel: setNotificationPolicyModel,
    error: error,
    setError: setError,
    loadData: () => loadData(getPolicy),
    isLoading: isLoading,
  });
}
