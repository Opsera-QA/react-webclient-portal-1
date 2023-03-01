import NotificationPolicyModel from "hooks/notification_policies/model/notificationPolicy.model";

export default function useGetNotificationPolicyModel() {
  const getNotificationPolicyModel = (
    notificationPolicy,
    isNew,
  ) => {
    const notificationPolicyModel = new NotificationPolicyModel(
      notificationPolicy,
      isNew,
    );

    // TODO: This is currently used for feature flagging the work. Remove when complete
    if (isNew === true) {
      notificationPolicyModel?.setData("type", "");
    }

    return notificationPolicyModel;
  };

  return ({
    getNotificationPolicyModel: getNotificationPolicyModel,
  });
}
