import NotificationPolicyModel from "hooks/notification_policies/model/notificationPolicy.model";

export default function useGetNotificationPolicyModel() {
  const getNotificationPolicyModel = (
    notificationPolicy,
    isNew,
  ) => {
    return new NotificationPolicyModel(
      notificationPolicy,
      isNew,
    );
  };

  return ({
    getNotificationPolicyModel: getNotificationPolicyModel,
  });
}
