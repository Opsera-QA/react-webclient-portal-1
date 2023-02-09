import { useState } from "react";
import useGetNotificationPolicyModel from "hooks/notification_policies/model/useGetNotificationPolicyModel";

export default function useGetNewNotificationPolicyModel() {
  const { getNotificationPolicyModel } = useGetNotificationPolicyModel();
  const [notificationPolicyModel, setNotificationPolicyModel] = useState(getNotificationPolicyModel(undefined, true));

  return ({
    notificationPolicyModel: notificationPolicyModel,
    setNotificationPolicyModel: setNotificationPolicyModel,
  });
}
