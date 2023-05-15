import useComponentStateReference from "hooks/useComponentStateReference";

export default function useItemSubscription(
  onUpdateFunction,
  onDeleteFunction,
) {
  const { clientWebsocket } = useComponentStateReference();
  const reactLogger = {};

  return reactLogger;
}