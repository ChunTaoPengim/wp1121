import React from 'react'


type ChatProps = {
  content: string;
  username: string;
};
export default function Chat ({
  content,
  username,
}:ChatProps) {
  return (
    <div>{username}: {content}</div>
  )
}

