import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import SubscriptionIcon from "components/common/icons/subscription/SubscriptionIcon";
import { DialogToastContext } from "contexts/DialogToastContext";
import useGetTaskSubscriptionStatus from "hooks/tasks/useGetTaskSubscriptionStatus";
import useTaskSubscriptionActions from "hooks/tasks/useTaskSubscriptionActions";

export default function TaskSubscriptionIcon(
  {
    taskModel,
    showText,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [isUpdatingSubscriptionStatus, setIsUpdatingSubscriptionStatus] = useState(false);
  const taskId = taskModel?.getMongoDbId();
  const taskSubscriptionActions = useTaskSubscriptionActions();
  const {
    isSubscribed,
    isLoading,
    loadData,
  } = useGetTaskSubscriptionStatus(taskId);

  const handleSubscriptionFunction = async () => {
    try {
      setIsUpdatingSubscriptionStatus(true);
      if (isSubscribed === true) {
        const response = await taskSubscriptionActions.unsubscribeFromTask(
          taskId,
        );

        if (response?.status === 200) {
          loadData();
          toastContext.showSystemSuccessToast(`You have successfully unsubscribed from ${taskModel?.getData("name")}`);
        }
      } else {
        const response = await taskSubscriptionActions.subscribeToTask(
          taskId,
        );

        if (response?.status === 200) {
          loadData();
          toastContext.showSystemSuccessToast(`You have successfully subscribed to ${taskModel?.getData("name")}`);
        }
      }
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Could not update subscription status:");
    } finally {
      setIsUpdatingSubscriptionStatus(false);
    }
  };

  if (taskId == null) {
    return null;
  }

  return (
    <SubscriptionIcon
      handleSubscription={handleSubscriptionFunction}
      isSubscribed={isSubscribed}
      showText={showText}
      isLoading={isLoading || isUpdatingSubscriptionStatus}
      className={className}
    />
  );
}

TaskSubscriptionIcon.propTypes = {
  taskModel: PropTypes.object,
  showText: PropTypes.bool,
  className: PropTypes.string,
};
