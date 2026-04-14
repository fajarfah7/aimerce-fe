"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChatMessageRequest, ChatMessageResponse } from "@/app/api/product/chat/dto";
import { GetChatMessage, SendChatMessage } from "@/app/api/product/chat/chat";

type ProductProps = {
  storeSlug: string;
  productSlug: string;
};

export function ChatProduct({ storeSlug, productSlug }: ProductProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageResponse[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const getChat = async () => {
      const res = await GetChatMessage({ storeSlug, productSlug });
      if (res.data) setChatMessages(res.data);
    };
    getChat();
  }, [storeSlug, productSlug]);

  const handleChat = () => {
    const send = async () => {
      const payload: ChatMessageRequest = {
        message: message,
        storeSlug: storeSlug,
        productSlug: productSlug,
      };

      const res = await SendChatMessage(payload);
      if (!res) return;
      if (!res.body) return;

      const reader = res.body.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let text = "";

      setChatMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: message,
        },
      ]);

      setMessage("");

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: text,
        },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        text += decoder.decode(value);
        setChatMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: "assistant",
            content: text,
          },
        ]);
      }
    };

    send();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth", // atau "auto"
    });
  }, [message]);

  return (
    <div>
      <Card className="w-80 md:h-115">
        <CardContent>
          <ScrollArea className="flex flex-col h-64 md:h-87 bg-gray-50 rounded-2xl">
            <div className="flex flex-col gap-2 p-4">
              {/* <ReactMarkdown>{`Hello can i help you about ${product.name}`}</ReactMarkdown>
              <div className="flex justify-end">
                <p className="bg-gray-200 rounded-full pl-4 pr-4">
                  Hello, what this product is good ?
                </p>
              </div>
              <ReactMarkdown>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ReactMarkdown>
              <div className="flex justify-end">
                <p className="bg-gray-200 rounded-full pl-4 pr-4">How about the specification ?</p>
              </div>
              <ReactMarkdown>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ReactMarkdown> */}

              {chatMessages.length > 0 ? (
                chatMessages.map((chat, idx) => (
                  <div key={idx}>
                    {chat.role === "user" ? (
                      <div className="flex justify-end">
                        <p className="bg-gray-200 rounded-full pl-4 pr-4">{chat.content}</p>
                      </div>
                    ) : (
                      <ReactMarkdown>{chat.content}</ReactMarkdown>
                    )}
                  </div>
                ))
              ) : (
                <span></span>
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <InputGroup className="mt-4">
            <InputGroupTextarea
              className="h-12"
              placeholder="Ask about the product"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleChat();
                }
              }}
            />
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton
                variant={"ghost"}
                className="rounded-full w-10 h-10 bg-blue-500 text-white hover:bg-blue-700 hover:text-white active:bg-blue-700 active:text-white md:hidden"
              >
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
      </Card>
    </div>
  );
}
