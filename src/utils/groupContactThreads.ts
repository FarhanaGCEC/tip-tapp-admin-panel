import { ContactMessage } from '../types/contactUsTypes'

export interface ContactThread {
  key: string
  name: string
  email: string
  phone: string
  messages: ContactMessage[]
  lastMessage: ContactMessage
  messageCount: number
}

function threadKey(message: ContactMessage): string {
  const email = (message.email || '').trim().toLowerCase()
  if (email) return email
  const phone = (message['phone no'] || '').trim()
  if (phone) return `phone:${phone}`
  return `id:${message.id}`
}

function messageTime(message: ContactMessage): number {
  const raw = message.date || message.createdAt || ''
  const time = new Date(raw).getTime()
  return Number.isNaN(time) ? 0 : time
}

/** Group contact messages into one thread per person (email / phone). */
export function groupContactThreads(
  messages: ContactMessage[]
): ContactThread[] {
  const map = new Map<string, ContactMessage[]>()

  messages.forEach((message) => {
    const key = threadKey(message)
    const list = map.get(key) || []
    list.push(message)
    map.set(key, list)
  })

  const threads: ContactThread[] = []

  map.forEach((list, key) => {
    const sorted = [...list].sort((a, b) => messageTime(a) - messageTime(b))
    const lastMessage = sorted[sorted.length - 1]
    threads.push({
      key,
      name: lastMessage.name || sorted[0].name || 'Unknown',
      email: lastMessage.email || sorted[0].email || '',
      phone: lastMessage['phone no'] || sorted[0]['phone no'] || '',
      messages: sorted,
      lastMessage,
      messageCount: sorted.length,
    })
  })

  return threads.sort(
    (a, b) => messageTime(b.lastMessage) - messageTime(a.lastMessage)
  )
}
