import {w3cwebsocket as W3CWebSocket} from "websocket/lib/websocket";
import {LIVE_MESSAGE_TOPICS} from "core/websocket/constants/liveMessage.constants";
import {WebsocketHelper} from "core/websocket/helper/websocket.helper";

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
  initializeWebsocket = () => {
    if (this.websocketClient != null) {
      console.log("websocket already initialized");
      return;
    }

    try {
      const websocketUrl = process.env.REACT_APP_OPSERA_WEBSOCKET_SERVER_URL;
      // const websocketUrl = "ws://localhost:8080/websocket";
      const newClient = new W3CWebSocket(websocketUrl);

      console.log("connecting to websocket");

      newClient.onopen = () => {
        console.log('WebSocket Client Connected');
      };

      newClient.onmessage = (message) => {
        // TODO: Do we need to JSON parse this?
        console.log(`[message] Data received from server: ${JSON.stringify(message.data)}`);
        this.handleLiveMessage(message);
      };

      newClient.onclose = (code, reason) => {
        console.log("code: " + JSON.stringify(code));
        console.log("reason: " + JSON.stringify(reason));
      };

      newClient.onerror = (error) => {
        console.error(JSON.stringify(error));
      };

      this.websocketClient = newClient;
    }
    catch (error) {
      console.log("Could not connect to websocket");
      console.error(error);
    }
  };

  getWebSocketClient = () => {
    return this.websocketClient;
  };

  closeWebsocket = () => {
    console.log("closing websocket");
    this.websocketClient.close();
    this.websocketClient = null;
  };

  handleLiveMessage = (liveMessage) => {
    this.subscriptions.forEach((subscription) => {
      if (subscription.topic === liveMessage.topic) {
        subscription.model.handleLiveMessage(liveMessage);
      }
    });
  };

  getState = () => {
    return this.websocketClient?.readyState;
  }

  getStateLabel = () => {
    return getWebsocketStateLabel(this.getState());
  }

  subscribeToTopic = (topic, model) => {
    // TODO: Check if open
    console.log("going to subscribe to topic: " + topic);

    console.log("state: " + this.websocketClient.readyState);

    if (this.getState() !== WEBSOCKET_STATE.CONNECTED) {
      console.error(`Websocket is not connected so cannot subscribe to topic [${topic}]. Current websocket state [${this.getStateLabel()}]`);
      return;
    }

    if (LIVE_MESSAGE_TOPICS[topic] == null) {
      console.error(`Cannot attempt to subscribe to an invalid topic: [${topic}]`);
      return;
    }

    // TODO: will this.websocketClient ever be null?
    //  Can we check connection status on the client itself?
    if (this.getState() === WEBSOCKET_STATE.CONNECTED) {
      console.log(`subscribing to topic: [${topic}]`);
      const subscriptionRequest = WebsocketHelper.generateLiveMessageForSubscriptionRequest(topic);
      const newSubscription = {
        topic: topic,
        model: model,
      };

      // TODO: Can the send call error out?
      this.websocketClient.send(subscriptionRequest);
      this.subscriptions.push(newSubscription);
      console.log("currentSubscriptions: " + JSON.stringify(this.subscriptions.length));
    }
  };

  unsubscribeFromTopic = (topic) => {
    // TODO: Check if open
    console.log("going to unsubscribe from topic: " + topic);

    if (this.getState() !== WEBSOCKET_STATE.CONNECTED) {
      console.error(`Websocket is not connected so cannot unsubscribe from topic [${topic}]. Current websocket state [${this.getStateLabel()}]`);
      return;
    }

    console.log("live message topics: " + JSON.stringify(LIVE_MESSAGE_TOPICS));
    console.log(`topic ${topic} : ${LIVE_MESSAGE_TOPICS[topic]}`);
    if (LIVE_MESSAGE_TOPICS[topic] == null) {
      console.log("not a valid topic");
      return;
    }

    if (this.websocketClient) {
      console.log(`unsubscribing from topic: [${topic}]`);
      const subscriptionRequest = WebsocketHelper.generateLiveMessageForUnsubscriptionRequest(topic);
      const currentSubscriptions = [...this.subscriptions];
      const subscriptionIndex = currentSubscriptions.findIndex((subscription) => subscription.topic === topic);

      if (subscriptionIndex !== -1) {
        console.log("removing item: " + subscriptionIndex);
        currentSubscriptions.splice(subscriptionIndex, 1);
        this.subscriptions = currentSubscriptions;
        console.log("currentSubscriptions: " + JSON.stringify(this.subscriptions.length));
      }

      this.websocketClient.send(subscriptionRequest);
    }
  };
}

export default ClientWebsocket;