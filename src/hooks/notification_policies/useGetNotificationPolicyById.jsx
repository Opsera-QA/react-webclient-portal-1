import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";

export default function useGetNotificationPolicyById(
  id,
  handleErrorFunction,
) {
  const [notificationPolicy, setNotificationPolicy] = useState(undefined);
  const notificationPolicyActions = useNotificationPolicyActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setNotificationPolicy(undefined);

    if (isMongoDbId(id) === true && loadData) {
      loadData(getPipeline, handleErrorFunction).catch(() => {});
    }
  }, [id]);

  const getPipeline = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await notificationPolicyActions.getNotificationPolicyById(id);
    const notification = DataParsingHelper.parseNestedObject(response, "data.data");

    if (notification) {
      setNotificationPolicy({...notification});
    }
  };

  return ({
    notificationPolicy: notificationPolicy,
    setNotificationPolicy: setNotificationPolicy,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
