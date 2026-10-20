import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Message from '../../Components/Message/Message'
import MessageInput from '../../Components/MessageInput/MessageInput'
import MessageSearch from '../../Components/MessageSearch/MessageSearch'
import ContactInfo from '../../Components/ContactInfo/ContactInfo'
import { ContactContext } from '../../Context/ContactContext'
import { formatMessageDate } from '../../utils/formatDate'
import { getActivityStatus } from '../../utils/formatActivity'
import useMessageSearch from '../../hooks/useMessageSearch'

export default function ContactDetailScreen() {
    const { selected_contact, sendMessage } = useContext(ContactContext)
    const messagesEndRef = useRef(null)
    const [searchOpen, setSearchOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)

    const messages = selected_contact ? selected_contact.messages : []
    const messagesCount = messages.length

    const {
        query,
        setQuery,
        matchingMessages,
        matchingIds,
        highlightedId,
        highlightMessage,
        reset,
    } = useMessageSearch(messages)

    // Al abrir el chat o enviar un mensaje, bajo hasta el último
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ block: 'end' })
        }
    }, [messagesCount, selected_contact?.id])

    function handleSelectMessage(messageId) {
        highlightMessage(messageId)
        const element = document.getElementById(`mensaje-${messageId}`)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    function handleToggleSearch() {
        if (searchOpen) {
            reset()
            setSearchOpen(false)
            return
        }
        setInfoOpen(false)
        setSearchOpen(true)
    }

    function handleCloseSearch() {
        reset()
        setSearchOpen(false)
    }

    function handleToggleInfo() {
        if (infoOpen) {
            setInfoOpen(false)
            return
        }
        if (searchOpen) {
            reset()
            setSearchOpen(false)
        }
        setInfoOpen(true)
    }

    function handleOpenSearchFromInfo() {
        setInfoOpen(false)
        setSearchOpen(true)
    }

    if (!selected_contact) {
        return (
            <div className='home-screen home-screen--detail'>
                <Sidebar />
                <main className='contenido-principal'>
                    <p className='home-empty'>No se encontró el contacto.</p>
                    <Link to='/home' className='contact-detail-back'>← Volver</Link>
                </main>
            </div>
        )
    }

    return (
        <div className='home-screen home-screen--detail'>
            <Sidebar />
            <main className='contenido-principal contact-detail'>
                <header className='contact-detail-header'>
                    <div
                        className='contact-detail-identity contact-detail-identity--clickable'
                        role='button'
                        tabIndex={0}
                        aria-label='Ver información del contacto'
                        aria-expanded={infoOpen}
                        onClick={handleToggleInfo}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                handleToggleInfo()
                            }
                        }}
                    >
                        <div className='contact-detail-avatar'>
                            {selected_contact.image
                                ? <img
                                    src={selected_contact.image}
                                    alt={selected_contact.name}
                                    className='contact-image'
                                    style={selected_contact.imagePosition ? { objectPosition: selected_contact.imagePosition } : undefined}
                                />
                                : <div className='contact-image-placeholder'>{selected_contact.name.trim().charAt(0).toUpperCase() || '?'}</div>
                            }
                        </div>
                        <div className='contact-detail-info'>
                            <h1>{selected_contact.name || 'Sin nombre'}</h1>
                            <span
                                className={
                                    'contact-detail-status'
                                    + (selected_contact.activity?.type === 'online' ? ' contact-detail-status--online' : '')
                                }
                            >
                                {getActivityStatus(selected_contact.activity)}
                            </span>
                        </div>
                    </div>
                    <div className='contact-detail-actions'>
                        <span className='contact-detail-icon-btn' aria-hidden='true' title='Videollamada'>
                            <svg
                                viewBox='0 0 24 24'
                                width='22'
                                height='22'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                aria-hidden='true'
                            >
                                <polygon points='23 7 16 12 23 17 23 7' />
                                <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
                            </svg>
                        </span>
                        <span className='contact-detail-icon-btn' aria-hidden='true' title='Llamada'>
                            <svg
                                viewBox='0 0 24 24'
                                width='22'
                                height='22'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                aria-hidden='true'
                            >
                                <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                            </svg>
                        </span>
                        <button
                            type='button'
                            className='contact-detail-icon-btn'
                            aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar en la conversación'}
                            title='Buscar en la conversación'
                            aria-pressed={searchOpen}
                            onClick={handleToggleSearch}
                        >
                            <svg
                                viewBox='0 0 24 24'
                                width='22'
                                height='22'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                aria-hidden='true'
                            >
                                <circle cx='11' cy='11' r='7' />
                                <path d='m20 20-3.5-3.5' />
                            </svg>
                        </button>
                        <Link
                            to='/home'
                            className='contact-detail-icon-btn'
                            aria-label='Volver a la lista de contactos'
                            title='Volver'
                        >
                            <svg
                                viewBox='0 0 24 24'
                                width='22'
                                height='22'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                aria-hidden='true'
                            >
                                <path d='M19 12H5' />
                                <path d='m12 19-7-7 7-7' />
                            </svg>
                        </Link>
                    </div>
                </header>
                <div
                    className={
                        'contact-detail-body'
                        + (searchOpen ? ' contact-detail-body--searching' : '')
                        + (infoOpen ? ' contact-detail-body--info' : '')
                    }
                >
                    <div className='contact-detail-chat'>
                        <div className='contact-detail-messages pantalla-chat'>
                            {messages.length === 0
                                ? <p>No hay mensajes todavía.</p>
                                : messages.map((message) => (
                                    <Message
                                        key={message.id}
                                        messageId={message.id}
                                        autor={message.author}
                                        contenido={message.content}
                                        estatus_envio={message.status}
                                        fecha={formatMessageDate(message.created_at)}
                                        isMatch={matchingIds.includes(message.id)}
                                        isHighlighted={highlightedId === message.id}
                                        onSelect={
                                            matchingIds.includes(message.id)
                                                ? () => handleSelectMessage(message.id)
                                                : undefined
                                        }
                                    />
                                ))
                            }
                            <div ref={messagesEndRef} />
                        </div>
                        <MessageInput onSend={(content) => sendMessage(selected_contact.id, content)} />
                    </div>
                    {searchOpen && (
                        <MessageSearch
                            query={query}
                            onQueryChange={setQuery}
                            results={matchingMessages}
                            onSelectMessage={handleSelectMessage}
                            onClose={handleCloseSearch}
                        />
                    )}
                    {infoOpen && (
                        <ContactInfo
                            key={selected_contact.id}
                            contact={selected_contact}
                            onClose={() => setInfoOpen(false)}
                            onOpenSearch={handleOpenSearchFromInfo}
                        />
                    )}
                </div>
            </main>
        </div>
    )
}
