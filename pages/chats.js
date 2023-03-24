import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// import { ChatFeed } from "react-chat-engine";
// import { Socket } from "react-chat-engine";
// import { ChatEngineWrapper } from "react-chat-engine";
import { ChatEngine } from "react-chat-engine";

// const ChatEngineWrapper = dynamic(() =>
// 	import("react-chat-engine").then((module) => module.ChatEngineWrapper)
// );
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);
const ScrollDownBar = dynamic(() =>
  import("react-chat-engine").then((module) => module.ScrollDownBar)
);
const NewChatForm = dynamic(() =>
  import("react-chat-engine").then((module) => module.NewChatForm)
);
// const Socket = dynamic(() =>
// 	import("react-chat-engine").then((module) => module.Socket)
// );

export default function Chats() {
  const { username, secret, email } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  });

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) {
      router.push("/");
    }
  });

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID={`${process.env.NEXT_PUBLIC_PROJECT_ID}`}
          userName={username}
          userSecret={secret}
          userEmail={email}
          renderNewMessageForm={() => <MessageFormSocial />}
          renderScrollDownBar={(chat) => <ScrollDownBar chat={chat} />}
          renderNewChatForm={(creds) => <NewChatForm />}
          offset={6}
        />
        {/* <ChatEngineWrapper>
					<Socket
						projectID={`${process.env.NEXT_PUBLIC_PROJECT_ID}`}
						userName={username}
						userSecret={secret}
						userEmail={email}
					/>
					<ChatFeed activeChat = {props.chat.id}/>
				</ChatEngineWrapper> */}
      </div>
    </div>
  );
}
