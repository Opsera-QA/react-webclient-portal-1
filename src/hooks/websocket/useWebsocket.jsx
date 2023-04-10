import {useContext, useEffect} from "react";
import {AuthContext} from "contexts/AuthContext";

export default function useWebsocket() {
  const { websocketClient } = useContext(AuthContext);

  useEffect(() => {}, []);

  const subscribeToTopic = (topic, model) => {
    websocketClient?.subscribeToTopic(topic, model);
  };

  const unsubscribeFromTopic = (topic, model) => {
    websocketClient?.unsubscribeFromTopic(topic, model);
  };

  return {
    subscribeToTopic: subscribeToTopic,
    unsubscribeFromTopic: unsubscribeFromTopic,
  };
}
