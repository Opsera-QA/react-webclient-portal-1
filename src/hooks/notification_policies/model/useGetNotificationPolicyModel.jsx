import NotificationPolicyModel from "hooks/notification_policies/model/notificationPolicy.model";

export default function useGetNotificationPolicyModel() {
  const getNotificationPolicyModel = (
    policy,
    isNew,
  ) => {
    return new NotificationPolicyModel(
      policy,
      isNew,
    );
  };

  return ({
    getNotificationPolicyModel: getNotificationPolicyModel,
  });
}
