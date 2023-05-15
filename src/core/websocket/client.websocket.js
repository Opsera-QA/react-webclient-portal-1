import io from 'socket.io-client';
import {NODE_API_ORCHESTRATOR_SERVER_URL} from "config";
import WebsocketLiveUpdateHelper from "@opsera/definitions/constants/websocket/helpers/websocketLiveUpdate.helper";
import LiveMessageConstants from "@opsera/definitions/constants/websocket/constants/liveMessage.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {ReactLoggingHandler} from "temp-library-components/handler/reactLogging.handler";
const websocketEnabled = DataParsingHelper.parseBooleanV2(process.env.REACT_APP_WEBSOCKET_ENABLED);

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

export default class ClientWebsocket {

  constructor() {
    this.subscriptions = [];
  }

  // TODO: Check if logged in
  initializeWebsocket = (userData) => {
    if (websocketEnabled !== true || userData == null) {
      return;
    }

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
      this.websocketClient = io(websocketUrl);
      this.websocketClient.connect();

      this.websocketClient.on("connect", () => {
        ReactLoggingHandler.logDebugMessage(
          "clientWebsocket",
          "initializeWebsocket",
          `WebSocket Client Connected: ${this.websocketClient.id}`,
        );
        this.resubscribe();
        this.websocketClient.emit("userData", userData);
      });

      // this.websocketClient.on("connect_error", (error) => {
      //   ReactLoggingHandler.logErrorMessage(
      //     "clientWebsocket",
      //     "initializeWebsocket",
      //     `Error with websocket:`,
      //     error,
      //   );
      // });

      this.websocketClient.on("disconnect", () => {
        ReactLoggingHandler.logDebugMessage(
          "clientWebsocket",
          "initializeWebsocket",
          `WebSocket Client Disconnected`,
        );
      });

      this.websocketClient.on("logger", (message) => {
        ReactLoggingHandler.logInfoMessage(
          "clientWebsocket",
          "initializeWebsocket",
          `Received log message: ${JSON.stringify(message, undefined, 2)}`,
        );
        console.log(message);
      });

      this.websocketClient.on("liveMessage", (liveMessage) => {
        this.handleLiveMessage(liveMessage);
      });
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
        "Closing Websocket",
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

    // TODO: Add check for valid live update message
    const parsedLiveMessage = DataParsingHelper.parseObject(liveMessage);

    if (parsedLiveMessage) {
      this.subscriptions.forEach((subscription) => {
        if (subscription.topic === parsedLiveMessage.topic && typeof subscription.liveUpdateHandlerFunction === "function") {
          const message = DataParsingHelper.parseNestedObject(parsedLiveMessage, "message");
          subscription.liveUpdateHandlerFunction(parsedLiveMessage.type, message);
        }
      });
    }
  };

  isConnected = () => {
    return this.websocketClient?.connected;
  };

  resubscribe = () => {
    if (this.isConnected() !== true) {
      return;
    }

    const parsedSubscriptions = DataParsingHelper.parseArray(this.subscriptions, []);

    parsedSubscriptions.forEach((subscription) => {
      const topicName = subscription.topic;
      const subscriptionRequest = WebsocketLiveUpdateHelper.generateLiveMessageForSubscriptionRequest(topicName);
      ReactLoggingHandler.logDebugMessage(
        "clientWebsocket",
        "subscribeToTopic",
        `subscribing to topic: [${topicName}]`,
      );
      this.websocketClient.emit("subscriptionRequest", subscriptionRequest);
    });
  };

  subscribeToTopic = (topicName, liveUpdateHandlerFunction) => {
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

    this.subscriptions.push(newSubscription);

    if (this.isConnected() !== true) {
      ReactLoggingHandler.logInfoMessage(
        "clientWebsocket",
        "subscribeToTopic",
        `Websocket is not connected so cannot subscribe to topic [${topicName}]`,
      );
      return;
    }

    ReactLoggingHandler.logDebugMessage(
      "clientWebsocket",
      "subscribeToTopic",
      `subscribing to topic: [${topicName}]`,
    );

    const subscriptionRequest = WebsocketLiveUpdateHelper.generateLiveMessageForSubscriptionRequest(topicName);
    this.websocketClient.emit("subscriptionRequest", subscriptionRequest);
  };

  // TODO: Determine if topics are automatically unsubscribed during connection interruption
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
