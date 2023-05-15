import io from 'socket.io-client';
import {NODE_API_ORCHESTRATOR_SERVER_URL} from "config";
import WebsocketLiveUpdateHelper from "@opsera/definitions/constants/websocket/helpers/websocketLiveUpdate.helper";
import LiveMessageConstants from "@opsera/definitions/constants/websocket/constants/liveMessage.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {ReactLoggingHandler} from "temp-library-components/handler/reactLogging.handler";

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
      ReactLoggingHandler.logDebugMessage(
        "clientWebsocket",
        "initializeWebsocket",
        `websocket already initialized`,
      );
      return;
    }

    this.user = userData;

    try {
      const websocketUrl = NODE_API_ORCHESTRATOR_SERVER_URL;
      const newClient = io(websocketUrl);
      newClient.connect();

      newClient.on("connect", () => {
        ReactLoggingHandler.logDebugMessage(
          "clientWebsocket",
          "initializeWebsocket",
          `WebSocket Client Connected: ${newClient.id}`,
        );
        // this.websocketClient.emit("userData", userData);
      });

      newClient.on("disconnect", () => {
        ReactLoggingHandler.logDebugMessage(
          "clientWebsocket",
          "initializeWebsocket",
          `WebSocket Client Disconnected`,
        );
      });

      newClient.on("logger", (message) => {
        ReactLoggingHandler.logInfoMessage(
          "clientWebsocket",
          "initializeWebsocket",
          `Received log message: ${JSON.stringify(message, undefined, 2)}`,
        );
        console.log(message);
      });

      newClient.on("liveMessage", (liveMessage) => {
        this.handleLiveMessage(liveMessage);
      });

      this.websocketClient = newClient;
    }
    catch (error) {
      ReactLoggingHandler.logErrorMessage(
        "clientWebsocket",
        "initializeWebsocket",
        `Could not connect to websocket:`,
        error,
      );
    }
  };

  getWebsocketClientInstance = () => {
    return this.websocketClient;
  };

  closeWebsocket = () => {
    if (this.isConnected() === true) {
      ReactLoggingHandler.logDebugMessage(
        "clientWebsocket",
        "closeWebsocket",
        "closing websocket",
      );
      this.websocketClient?.close();
      this.websocketClient = null;
    }
  };

  handleLiveMessage = (liveMessage) => {
    ReactLoggingHandler.logDebugMessage(
      "clientWebsocket",
      "handleLiveMessage",
      `Received live message:  ${JSON.stringify(liveMessage, undefined, 2)}`,
    );
    this.subscriptions.forEach((subscription) => {
      if (subscription.topic === liveMessage.topic && typeof subscription.liveUpdateHandlerFunction === "function") {
        const data = DataParsingHelper.parseNestedObject(liveMessage, "message.data");
        subscription.liveUpdateHandlerFunction(liveMessage.type, data);
      }
    });
  };

  isConnected = () => {
    return this.websocketClient?.connected;
  };

  subscribeToTopic = (topicName, liveUpdateHandlerFunction) => {
    if (this.isConnected() !== true) {
      ReactLoggingHandler.logErrorMessage(
        "clientWebsocket",
        "subscribeToTopic",
        undefined,
        `Websocket is not connected so cannot subscribe to topic [${topicName}].`,
      );
      return;
    }

    if (LiveMessageConstants.LIVE_MESSAGE_TOPICS[topicName] == null) {
      ReactLoggingHandler.logErrorMessage(
        "clientWebsocket",
        "subscribeToTopic",
        undefined,
        `Cannot attempt to subscribe to an invalid topic: [${topicName}]`,
      );
      return;
    }

    const foundIndex = this.subscriptions.indexOf((subscription) => subscription?.topic === topicName);

    if (foundIndex !== -1) {
      return;
    }

    if (typeof liveUpdateHandlerFunction !== "function") {
      ReactLoggingHandler.logErrorMessage(
        "clientWebsocket",
        "subscribeToTopic",
        undefined,
        `Cannot attempt to subscribe with an invalid live update handler function.`,
      );
      return;
    }

    const newSubscription = {
      topic: topicName,
      liveUpdateHandlerFunction: liveUpdateHandlerFunction,
    };

    const subscriptionRequest = WebsocketLiveUpdateHelper.generateLiveMessageForSubscriptionRequest(topicName);
    ReactLoggingHandler.logDebugMessage(
      "clientWebsocket",
      "subscribeToTopic",
      `subscribing to topic: [${topicName}]`,
    );
    this.websocketClient.emit("subscriptionRequest", subscriptionRequest);


    this.subscriptions.push(newSubscription);
  };

  unsubscribeFromTopic = (topicName) => {
    if (this.isConnected() !== true) {
      return;
    }

    if (LiveMessageConstants.LIVE_MESSAGE_TOPICS[topicName] == null) {
      ReactLoggingHandler.logErrorMessage(
        "clientWebsocket",
        "subscribeToTopic",
        undefined,
        `Cannot attempt to unsubscribe from an invalid topic: [${topicName}]`
      );
      return;
    }

    ReactLoggingHandler.logDebugMessage(
      "clientWebsocket",
      "subscribeToTopic",
      `unsubscribing from topic: [${topicName}]`,
    );
    const unsubscriptionRequest = WebsocketLiveUpdateHelper.generateLiveMessageForUnsubscriptionRequest(topicName);
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