import { useState } from 'react'
import './MessageInput.css'

export default function MessageInput({ onSend }) {
    const [text, setText] = useState('')

    const canSend = text.trim().length > 0

    function handleSubmit(event) {
        event.preventDefault()
        if (!canSend) return

        onSend(text.trim())
        setText('')
    }

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                className="message-input-field"
                placeholder="Escribe un mensaje"
                aria-label="Escribe un mensaje"
                value={text}
                onChange={(event) => setText(event.target.value)}
                autoComplete="off"
            />
            <button
                type="submit"
                className="message-input-send"
                aria-label="Enviar mensaje"
                title="Enviar mensaje"
                disabled={!canSend}
            >
                <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M20 6 9 17l-5-5" />
                </svg>
            </button>
        </form>
    )
}
