import { formatMessageDate } from '../../utils/formatDate'
import './MessageSearch.css'

export default function MessageSearch({ query, onQueryChange, results, onSelectMessage, onClose }) {
    return (
        <aside className='message-search' aria-label='Buscar mensajes'>
            <div className='message-search-header'>
                <span className='message-search-title'>Buscar en el chat</span>
                <button
                    type='button'
                    className='message-search-close'
                    aria-label='Cerrar búsqueda'
                    title='Cerrar búsqueda'
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>

            <div className='message-search-field'>
                <svg
                    viewBox='0 0 24 24'
                    width='18'
                    height='18'
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
                <input
                    type='text'
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder='Buscar mensajes'
                    aria-label='Buscar mensajes'
                    autoFocus
                />
                {query.length > 0 && (
                    <button
                        type='button'
                        className='message-search-clear'
                        aria-label='Limpiar búsqueda'
                        onClick={() => onQueryChange('')}
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className='message-search-results'>
                {results.length === 0
                    ? (
                        <p className='message-search-empty'>
                            No se encontró ningún mensaje.
                        </p>
                    )
                    : results.map((message) => (
                        <button
                            key={message.id}
                            type='button'
                            className='message-search-result'
                            onClick={() => onSelectMessage(message.id)}
                        >
                            <span className='message-search-result-top'>
                                <span className='message-search-result-author'>{message.author}</span>
                                <span className='message-search-result-date'>{formatMessageDate(message.created_at)}</span>
                            </span>
                            <span className='message-search-result-content'>{message.content}</span>
                        </button>
                    ))
                }
            </div>
        </aside>
    )
}
