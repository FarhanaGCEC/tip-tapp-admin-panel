/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
// src/components/SocketClient.tsx
import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import SharedDataContainer from '../containers/sharedData'
import Toast from '../utils/notification';

interface Notification {
  message: string;
}

interface SocketClientProps {
  email: string;
  role: string;
}

const SocketClient: React.FC<SocketClientProps> = ({ email, role }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const { setNotification } = SharedDataContainer.useContainer()

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_SOCKET_API}`, {
      query: { email, role },
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
    });

    newSocket.on('notification', (data: Notification) => {
      setNotification({
        title: 'Notification',
        message: data.message,
        type: 'success',
      })
      Toast()
    });

    return () => {
      newSocket.disconnect();
    };
  }, [email, role]);

  return (
    <></>
  );
};

export default SocketClient;
