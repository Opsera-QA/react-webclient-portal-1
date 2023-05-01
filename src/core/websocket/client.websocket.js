import {LIVE_MESSAGE_TOPICS} from "core/websocket/constants/liveMessage.constants";
import {WebsocketHelper} from "core/websocket/helper/websocket.helper";
import io from 'socket.io-client';
import {NODE_API_ORCHESTRATOR_SERVER_URL} from "config";

export const WEBSOCKET_STATE = {
  CONNECTING: 0,
  CONNECTED: 1,
  DISCONNECTING: 2,
  DISCONNECTED: 3,
};

export const WEBSOCKET_STATE_LABELS = {
  CONNECTING: "Connecting",
  CONNECTED: "Connected",
  DISCONNECTING: "Disconnecting",
  DISCONNECTED: "Disconnected",
};

export const getWebsocketStateLabel = (state) => {
  switch (state) {
    case WEBSOCKET_STATE.CONNECTING:
      return WEBSOCKET_STATE_LABELS.CONNECTING;
    case WEBSOCKET_STATE.CONNECTED:
      return WEBSOCKET_STATE_LABELS.CONNECTED;
    case WEBSOCKET_STATE.DISCONNECTING:
      return WEBSOCKET_STATE_LABELS.DISCONNECTING;
    case WEBSOCKET_STATE.DISCONNECTED:
      return WEBSOCKET_STATE_LABELS.DISCONNECTED;
  }
};

export class ClientWebsocket {

  constructor() {
    this.subscriptions = [];
  }

  // TODO: Check if logged in
  initializeWebsocket = (userData) => {
    if (this.websocketClient != null) {
      console.log("websocket already initialized");
      return;
    }

    this.user = userData;

    try {
      const websocketUrl = NODE_API_ORCHESTRATOR_SERVER_URL;
      const newClient = io(websocketUrl);
      newClient.connect();

      newClient.on("connect", () => {
        console.log(`WebSocket Client Connected: ${newClient.id}`);
        this.websocketClient.emit("userData", userData);
      });

      newClient.on("disconnect", () => {
        console.log("Websocket Disconnected");
      });

      newClient.on("logger", (message) => {
        console.log(message);
      });

      newClient.on("liveMessage", (liveMessage) => {
        this.handleLiveMessage(liveMessage);
      });

      this.websocketClient = newClient;
    }
    catch (error) {
      console.log("Could not connect to websocket");
      console.error(error);
    }
  };

  getWebsocketClientInstance = () => {
    return this.websocketClient;
  };

  closeWebsocket = () => {
    if (this.isConnected() === true) {
      console.log("closing websocket");
      this.websocketClient?.close();
      this.websocketClient = null;
    }
  };

  handleLiveMessage = (liveMessage) => {
    console.log("received live message: " + JSON.stringify(liveMessage));
    this.subscriptions.forEach((subscription) => {
      if (subscription.topic === liveMessage.topic) {
        subscription.model.handleLiveMessage(liveMessage);
      }
    });
  };

  isConnected = () => {
    return this.websocketClient?.connected;
  };

  subscribeToTopic = (topicName, model) => {
    if (this.isConnected() !== true) {
      console.error(`Websocket is not connected so cannot subscribe to topic [${topicName}].`);
      return;
    }

    if (LIVE_MESSAGE_TOPICS[topicName] == null) {
      console.error(`Cannot attempt to subscribe to an invalid topic: [${topicName}]`);
      return;
    }

    const foundIndex = this.subscriptions.indexOf((subscription) => subscription?.topic === topicName);

    if (foundIndex !== -1) {
      return;
    }

    const newSubscription = {
      topic: topicName,
      model: model,
    };

    const subscriptionRequest = WebsocketHelper.generateLiveMessageForSubscriptionRequest(topicName);
    console.log(`subscribing to topic: [${topicName}]`);
    this.websocketClient.emit("subscriptionRequest", subscriptionRequest);


    this.subscriptions.push(newSubscription);
  };

  unsubscribeFromTopic = (topicName) => {
    if (this.isConnected() !== true) {
      return;
    }

    if (LIVE_MESSAGE_TOPICS[topicName] == null) {
      console.error(`Cannot attempt to unsubscribe from an invalid topic: [${topicName}]`);
      return;
    }

    console.log(`unsubscribing from topic: [${topicName}]`);
    const unsubscriptionRequest = WebsocketHelper.generateLiveMessageForUnsubscriptionRequest(topicName);
    const currentSubscriptions = [...this.subscriptions];
    const subscriptionIndex = currentSubscriptions.findIndex((subscription) => subscription.topic === topicName);

    if (subscriptionIndex !== -1) {
      currentSubscriptions.splice(subscriptionIndex, 1);
      this.subscriptions = currentSubscriptions;
    }

    this.websocketClient.emit("unsubscriptionRequest", unsubscriptionRequest);
  };
}

export default ClientWebsocket;