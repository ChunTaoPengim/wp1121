import React from 'react'


type ChatProps = {
  content: string;
  username: string;
};
const Chat = ({
  content,
  username,
}:ChatProps) => {
  return (
    <div>{username}: {content}</div>
  )
}

export default Chat