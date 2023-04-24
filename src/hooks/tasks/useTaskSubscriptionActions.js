import useApiService from "hooks/api/service/useApiService";

export default function useTaskSubscriptionActions() {
  const apiService = useApiService();
  const taskSubscriptionActions = {};

  taskSubscriptionActions.subscribeToTask = async (taskId) => {
    const apiUrl = `/subscriptions/tasks/${taskId}/subscribe`;
    return await apiService.handleApiPutRequest(apiUrl);
  };

  taskSubscriptionActions.unsubscribeFromTask = async (taskId) => {
    const apiUrl = `/subscriptions/tasks/${taskId}/unsubscribe`;
    return await apiService.handleApiDeleteRequest(apiUrl);
  };

  taskSubscriptionActions.isSubscribed = async (taskId) => {
    const apiUrl = `/subscriptions/tasks/${taskId}/is_subscribed`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  taskSubscriptionActions.getSubscribedTasks = async () => {
    const apiUrl = `/subscriptions/tasks`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  taskSubscriptionActions.getSubscribedTaskIds = async () => {
    const apiUrl = `/subscriptions/tasks/ids`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return taskSubscriptionActions;
}
