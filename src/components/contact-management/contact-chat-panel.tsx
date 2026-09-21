import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ContactMessage, ContactReply } from '../../types/contactUsTypes'
import { ContactThread } from '../../utils/groupContactThreads'
import Lucide from '../common/lucide'

interface ContactChatPanelProps {
  thread: ContactThread
  messages: ContactMessage[]
  isLoading?: boolean
  onClose: () => void
  onSendReply: (messageId: string, replyMessage: string) => Promise<void>
}

type ChatBubble =
  | {
      key: string
      kind: 'user'
      text: string
      at: string
    }
  | {
      key: string
      kind: 'admin'
      text: string
      at: string
    }

function toDate(value?: string) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function formatDayLabel(date: Date) {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (dayKey(date) === dayKey(today)) return 'Today'
  if (dayKey(date) === dayKey(yesterday)) return 'Yesterday'
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatClock(date: Date) {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function buildTimeline(messages: ContactMessage[]): ChatBubble[] {
  const sorted = [...messages].sort((a, b) => {
    const aTime = toDate(a.date || a.createdAt)?.getTime() ?? 0
    const bTime = toDate(b.date || b.createdAt)?.getTime() ?? 0
    return aTime - bTime
  })

  const bubbles: ChatBubble[] = []

  sorted.forEach((message) => {
    bubbles.push({
      key: `user-${message.id}`,
      kind: 'user',
      text: message.message || '',
      at: message.date || message.createdAt,
    })

    ;(message.replies || []).forEach((reply: ContactReply) => {
      bubbles.push({
        key: `admin-${reply.id}`,
        kind: 'admin',
        text: reply.replyMessage || reply.message || '',
        at: reply.sentAt || reply.createdAt || '',
      })
    })
  })

  return bubbles
}

const ContactChatPanel: React.FC<ContactChatPanelProps> = ({
  thread,
  messages,
  isLoading,
  onClose,
  onSendReply,
}) => {
  const [reply, setReply] = useState('')
  const [isSending, setIsSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  const timeline = useMemo(() => buildTimeline(messages), [messages])

  const replyTargetId = useMemo(() => {
    const sorted = [...messages].sort((a, b) => {
      const aTime = toDate(a.date || a.createdAt)?.getTime() ?? 0
      const bTime = toDate(b.date || b.createdAt)?.getTime() ?? 0
      return aTime - bTime
    })
    const open = [...sorted].reverse().find((m) => {
      const action = m.action || m.status
      return action !== 'complete' && action !== 'rejected'
    })
    return (open || sorted[sorted.length - 1])?.id
  }, [messages])

  const timelineWithDays = useMemo(() => {
    let last = ''
    return timeline.map((bubble) => {
      const date = toDate(bubble.at)
      const currentDay = date ? dayKey(date) : ''
      const showDay = Boolean(currentDay && currentDay !== last)
      if (currentDay) last = currentDay
      return { bubble, date, showDay }
    })
  }, [timeline])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [timeline, isLoading])

  const handleSend = async () => {
    if (!reply.trim() || !replyTargetId) return
    setIsSending(true)
    try {
      await onSendReply(String(replyTargetId), reply.trim())
      setReply('')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#EEF1F5]">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-3 shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
          {initials(thread.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-brand-navy">
            {thread.name}
          </h3>
          <p className="truncate text-xs text-slate-500">
            {thread.email}
            {thread.phone ? ` · ${thread.phone}` : ''}
          </p>
        </div>
        <button
          type="button"
          aria-label="Close chat"
          className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-brand-navy"
          onClick={onClose}
        >
          <Lucide icon="X" className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-1.5 overflow-y-auto px-3 py-4 sm:px-4"
      >
        {isLoading ? (
          <div className="flex h-40 items-center justify-center text-sm text-slate-500">
            <Lucide icon="Loader" className="mr-2 h-4 w-4 animate-spin" />
            Loading conversation…
          </div>
        ) : timelineWithDays.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center text-slate-400">
            <Lucide icon="MessageSquare" className="mb-2 h-8 w-8 opacity-40" />
            <p className="text-sm">No messages yet</p>
          </div>
        ) : (
          timelineWithDays.map(({ bubble, date, showDay }) => {
            const isAdmin = bubble.kind === 'admin'

            return (
              <React.Fragment key={bubble.key}>
                {showDay && date ? (
                  <div className="my-3 flex justify-center">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm ring-1 ring-slate-200/70">
                      {formatDayLabel(date)}
                    </span>
                  </div>
                ) : null}

                <div
                  className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2 shadow-sm ${
                      isAdmin
                        ? 'rounded-2xl rounded-br-md bg-brand-navy text-white'
                        : 'rounded-2xl rounded-bl-md bg-white text-brand-navy ring-1 ring-slate-200/80'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-[13.5px] leading-relaxed">
                      {bubble.text}
                    </p>
                    {date ? (
                      <p
                        className={`mt-1 text-right text-[10px] leading-none ${
                          isAdmin ? 'text-white/55' : 'text-slate-400'
                        }`}
                      >
                        {formatClock(date)}
                      </p>
                    ) : null}
                  </div>
                </div>
              </React.Fragment>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer — pinned to bottom */}
      <div className="shrink-0 border-t border-slate-200/80 bg-white px-3 py-3 sm:px-4">
        <div className="flex items-end gap-2 rounded-2xl bg-[#F4F6F8] p-2 ring-1 ring-slate-200/80 focus-within:ring-brand-navy/30">
          <textarea
            rows={1}
            className="max-h-28 min-h-[40px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-brand-navy placeholder:text-slate-400 focus:outline-none focus:ring-0"
            placeholder="Type a reply…"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <button
            type="button"
            aria-label="Send reply"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white transition hover:bg-[#243456] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={isSending || !reply.trim() || !replyTargetId}
            onClick={handleSend}
          >
            {isSending ? (
              <Lucide icon="Loader" className="h-4 w-4 animate-spin" />
            ) : (
              <Lucide icon="Send" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactChatPanel
