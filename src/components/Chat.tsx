"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import connectWebSocket from "@/utils/websocket";
import { Client } from "@stomp/stompjs";
import {
  Avatar,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";

type Message = {
  id?: number;
  senderId: number;
  receiverId: number;
  chatRoomId: number;
  content: string;
  timestamp?: string;
};

const Chat = ({
  userId,
  children,
}: {
  userId?: number;
  children: ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [client, setClient] = useState<Client>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { user } = useAuth();

  const senderId = user?.id || 1;
  const receiverId = userId || 1;

  console.log("Sender ID:", senderId);
  console.log("Receiver ID:", receiverId);

  useEffect(() => {
    if (isOpen) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `http://localhost:8888/api/v1/chats?senderId=${senderId}&receiverId=${receiverId}`,
            {
              credentials: "include",
            }
          );
          if (response.ok) {
            const data: Message[] = await response.json();
            setMessages(data);
          } else {
            console.error("Failed to fetch messages.");
          }
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      };

      fetchMessages();

      const webSocketClient = connectWebSocket(
        senderId.toString(),
        receiverId.toString(),
        (message: Record<string, any>) => {
          const formattedMessage: Message = {
            senderId: message.senderId,
            receiverId: message.receiverId,
            content: message.content,
            chatRoomId: message.chatRoomId,
            timestamp: message.timestamp,
          };
          console.log(message);

          console.log("Received message:", formattedMessage);
          setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        }
      );

      setClient(webSocketClient);

      return () => {
        webSocketClient.deactivate();
      };
    }
  }, [senderId, receiverId, isOpen]);

  const sendMessage = () => {
    if (client && newMessage.trim()) {
      const chatRoomId =
        Math.min(senderId, receiverId) * 1000 + Math.max(senderId, receiverId);
      const message: Message = {
        senderId,
        receiverId,
        chatRoomId,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      // setMessages((prevMessages) => [...prevMessages, message]);

      client.publish({
        destination: "/app/chat",
        body: JSON.stringify(message),
      });

      setNewMessage("");
    }
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="text-lg font-semibold">Chat</div>
                <div className="text-sm text-secondary">
                  Chat với chúng tôi để được tư vấn tốt nhất
                </div>
              </ModalHeader>
              <ModalBody>
                {messages.map((message, index) => {
                  const currentDate = new Date(
                    message.timestamp || ""
                  ).toLocaleDateString();
                  const previousDate =
                    index > 0
                      ? new Date(
                          messages[index - 1].timestamp || ""
                        ).toLocaleDateString()
                      : null;

                  const isDifferentDate = currentDate !== previousDate;

                  const style =
                    message.senderId === senderId
                      ? "inline-block text-white bg-secondary py-1 px-3 rounded-full"
                      : "inline-block text-primaryText bg-gray-300 py-1 px-3 rounded-full";

                  return (
                    <div
                      key={index}
                      ref={index === messages.length - 1 ? chatEndRef : null}
                    >
                      {/* Render the date if it's different */}
                      {isDifferentDate && (
                        <div className="text-center text-xs text-gray-500 my-2">
                          {currentDate}
                        </div>
                      )}
                      <div
                        className={`${
                          message.senderId === senderId
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        <div className={style}>{message.content}</div>
                        <div className="text-xs text-secondary mx-2 my-1">
                          {new Date(message.timestamp || "").toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter className="flex flex-col gap-2 border-t-2 border-gray-200 pt-2">
                <div className="w-full flex flex-row items-center">
                  <Input
                    className="w-full"
                    name="message"
                    placeholder="Nhập tin nhắn..."
                    type="message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    radius="full"
                    color="primary"
                    type="submit"
                    size="sm"
                    onClick={sendMessage}
                  >
                    Gửi
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Chat;
