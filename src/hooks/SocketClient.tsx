/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import SharedDataContainer from '../containers/sharedData'
import Toast from '../utils/notification'
import { OFFLINE_DEMO } from '../utils/offlineSession'

interface Notification {
  message: string
}

interface SocketClientProps {
  email: string
  role: string
}

/**
 * Realtime notifications. Socket.IO retries forever by default — when the
 * socket host is down that floods Network with polling requests. Cap retries.
 */
const SocketClient: React.FC<SocketClientProps> = ({ email, role }) => {
  const { setNotification } = SharedDataContainer.useContainer()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_API
    if (OFFLINE_DEMO || !socketUrl || !email) {
      return undefined
    }

    // Avoid duplicate connections (e.g. React Strict Mode remount)
    if (socketRef.current?.connected) {
      return undefined
    }

    const newSocket = io(socketUrl, {
      query: { email, role },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 15000,
      timeout: 10000,
      autoConnect: true,
    })

    socketRef.current = newSocket

    newSocket.on('connect', () => {
      console.info('[socket] connected')
    })

    newSocket.on('connect_error', (err) => {
      console.warn('[socket] connect_error:', err.message)
    })

    newSocket.on('reconnect_failed', () => {
      console.warn(
        '[socket] gave up after max reconnection attempts — check VITE_SOCKET_API'
      )
      newSocket.disconnect()
    })

    newSocket.on('notification', (data: Notification) => {
      setNotification({
        title: 'Notification',
        message: data.message,
        type: 'success',
      })
      Toast()
    })

    return () => {
      newSocket.removeAllListeners()
      newSocket.disconnect()
      socketRef.current = null
    }
  }, [email, role])

  return null
}

export default SocketClient
