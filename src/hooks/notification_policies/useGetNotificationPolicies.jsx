import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";
import Model from "core/data_model/model";
import notificationsFilterMetadata from "components/notifications/notifications-filter-metadata";

export default function useGetNotificationPolicies() {
  const [notificationPolicies, setNotificationPolicies] = useState([]);
  const [notificationFilterModel, setNotificationFilterModel] = useState(new Model({...notificationsFilterMetadata.newObjectFields}, notificationsFilterMetadata, false));
  const notificationPolicyActions = useNotificationPolicyActions();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setNotificationPolicies([]);
    loadData(getNotificationPolicies).catch(() => {});
  }, []);

  const getNotificationPolicies = async (newFilterModel = notificationFilterModel) => {
    const response = await notificationPolicyActions.getNotificationsPolicies(
      notificationFilterModel,
    );
    setNotificationPolicies([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);

    if (newFilterModel) {
      newFilterModel?.setData("totalCount", response?.data?.count);
      newFilterModel?.setData("activeFilters", newFilterModel.getActiveFilters());
      setNotificationFilterModel({...newFilterModel});
    }
  };

  return ({
    notificationPolicies: notificationPolicies,
    setNotificationPolicies: setNotificationPolicies,
    notificationFilterModel: notificationFilterModel,
    setNotificationFilterModel: setNotificationFilterModel,
    loadData: () => loadData(getNotificationPolicies),
    isLoading: isLoading,
    error: error,
  });
}
