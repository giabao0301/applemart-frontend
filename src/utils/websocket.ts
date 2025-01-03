import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type MessageCallback = (message: Record<string, any>) => void;

const connectWebSocket = (
  senderId: string,
  receiverId: string,
  onMessageReceived: MessageCallback
): Client => {
  const client = new Client({
    brokerURL: "ws://localhost:8084/ws",
    webSocketFactory: () => new SockJS("http://localhost:8084/ws"),
    onConnect: () => {
      console.log("Connected to WebSocket");

      client.subscribe(
        `/user/${senderId}/queue/messages`,
        (message: IMessage) => {
          console.log("Received private message:", message.body);
          onMessageReceived(JSON.parse(message.body));
        }
      );

      client.subscribe(
        `/user/${receiverId}/queue/messages`,
        (message: IMessage) => {
          console.log("Received private message:", message.body);
          onMessageReceived(JSON.parse(message.body));
        }
      );
    },
    onStompError: (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
      console.error("Additional details:", frame.body);
    },
    onDisconnect: () => console.log("Disconnected from WebSocket"),
  });

  client.activate();

  return client;
};

export default connectWebSocket;
