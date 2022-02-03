import {w3cwebsocket as W3CWebSocket} from "websocket/lib/websocket";

export const WEBSOCKET_STATE = {
  CONNECTING: 0,
  CONNECTED: 1,
  DISCONNECTED: 2,
};

export class ClientWebsocket {

  constructor() {
    this.initializeWebsocket();
  }

  // TODO: Check if logged in
  initializeWebsocket = () => {
    try {
      const websocketUrl = process.env.REACT_APP_OPSERA_WEBSOCKET_SERVER_URL;
      const newClient = new W3CWebSocket(websocketUrl);

      newClient.onopen = () => {
        console.log('WebSocket Client Connected');
      };

      newClient.onmessage = (message) => {
        // TODO: Do we need to JSON parse this?
        console.log(`[message] Data received from server: ${JSON.stringify(message.data)}`);
      };

      newClient.onclose = (code, reason) => {
        console.log("code: " + code);
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

  subscribeToTopic = (topic) => {
    // TODO: Check if open
    console.log("going to subscribe to topic: " + topic);
    if (this.websocketClient) {
      console.log(`subscribing to topic: [${topic}]`);
      this.websocketClient.send(JSON.stringify({
        subscriptionRequest: topic,
      }));
    }
  };

  unsubscribeFromTopic = (topic) => {
    // TODO: Check if open
    console.log("going to unsubscribe from topic: " + topic);
    if (this.websocketClient) {
      console.log(`unsubscribing from topic: [${topic}]`);
      this.websocketClient.send(JSON.stringify({
        unsubscriptionRequest: topic,
      }));
    }
  };
}