import useComponentStateReference from "hooks/useComponentStateReference";

export default function useItemSubscription(
  topicName,
  recordId,
  onUpdateFunction,
  onDeleteFunction,
) {
  const { clientWebsocket } = useComponentStateReference();
  const reactLogger = {};

  return reactLogger;
}