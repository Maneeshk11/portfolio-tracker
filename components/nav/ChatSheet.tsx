"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "../ui/sheet";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { useChat } from "@ai-sdk/react";
import { useAccount } from "wagmi";
import ReactMarkdown from "react-markdown";

// Define the form data type explicitly without Zod
type FormData = {
  message: string;
};

const ChatSheet = () => {
  const { address, chainId } = useAccount();

  const form = useForm<FormData>({
    defaultValues: {
      message: "",
    },
  });

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      address: address,
      chainId: chainId,
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-full cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[90vw] max-w-[1000px] sm:max-w-[600px]"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat
          </SheetTitle>
          <SheetDescription>
            Chat with the AI to help you manage your portfolio
          </SheetDescription>
        </SheetHeader>
        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-4/5 rounded-xl px-2 prose prose-sm ${
                message.role === "user"
                  ? "ml-auto bg-primary/30 border border-primary/50 text-black"
                  : "mr-auto bg-secondary/30 border border-secondary/50 text-black"
              }`}
            >
              {message.parts.map(
                (part, i) =>
                  part.type === "text" && (
                    <div
                      key={i}
                      className="text-sm whitespace-normal break-words"
                    >
                      <ReactMarkdown>{part.text || "..."}</ReactMarkdown>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
        <SheetFooter className="mb-4 w-full">
          <Form {...form}>
            <form
              onSubmit={(event) => {
                handleSubmit(event, {
                  body: {
                    address: address,
                    chainId: chainId,
                  },
                });
              }}
              className="flex gap-2 w-full items-center"
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-4/5">
                    <FormControl>
                      <div className="flex gap-2">
                        <Textarea
                          {...field}
                          placeholder="Ask me anything"
                          className="whitespace-normal break-words overflow-y-auto"
                          value={input}
                          onChange={handleInputChange}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="cursor-pointer">
                Send
              </Button>
            </form>
          </Form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSheet;
