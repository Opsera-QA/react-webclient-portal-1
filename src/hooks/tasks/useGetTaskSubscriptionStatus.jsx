import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useTaskSubscriptionActions from "hooks/tasks/useTaskSubscriptionActions";

export default function useGetTaskSubscriptionStatus(
  id,
  pullSubscriptionStatus,
  handleErrorFunction,
) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const taskSubscriptionActions = useTaskSubscriptionActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
    apiState,
  } = useLoadData();

  useEffect(() => {
    setIsSubscribed(undefined);

    if (isMongoDbId(id) === true && loadData && pullSubscriptionStatus !== false) {
      loadData(getTaskSubscriptionStatus, handleErrorFunction).catch(() => {});
    }
  }, [id]);

  const getTaskSubscriptionStatus = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await taskSubscriptionActions.isSubscribed(id);
    const subscribed = DataParsingHelper.parseNestedBoolean(response, "data.data");
    setIsSubscribed(subscribed);
  };

  return ({
    isSubscribed: isSubscribed,
    setIsSubscribed: setIsSubscribed,
    apiState: apiState,
    loadData: async () => await loadData(getTaskSubscriptionStatus, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
